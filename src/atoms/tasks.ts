import { atom, selector, selectorFamily } from "recoil";
import { SortOrder } from "../domain/Filter/SortConfig";
import { TaskDTO } from "../entities/Task";
import TaskRepository from "../repositories/TaskRepository";
import { mapValue } from "../utils/object";

export type CachedTask = TaskDTO & {
  focused: boolean;
};

export const mapToCachedTask = (task: TaskDTO): CachedTask => ({
  ...task,
  focused: false,
});

export type TaskAtomValue = Record<string, CachedTask>;
const getAtomDefaultValue = async () => {
  const pendingTasksByDate = await TaskRepository.find(
    {},
    {
      sortBy: "order",
      order: SortOrder.ASC,
    }
  );
  const tasksMappingById = Object.fromEntries(
    pendingTasksByDate.map((task) => [task.id, mapToCachedTask(task)])
  );
  return tasksMappingById;
};

const taskAtom = atom<TaskAtomValue>({
  key: "atom",
  default: getAtomDefaultValue(),
});

export const subTaskAtom = selectorFamily<TaskDTO[], string>({
  key: "subtask-family",
  get:
    (taskId) =>
    ({ get }) =>
      Object.values(get(taskAtom)).filter((task) => task.parentId === taskId),
});

export const focusedTaskSelector = selector<CachedTask | null>({
  key: "focused-task",
  get: ({ get }) =>
    Object.values(get(taskAtom)).find((task) => task.focused) ?? null,
  set: ({ set, get }, newValue) => {
    const taskMapping = get(taskAtom);
    const currentlyFocusedTaskId = Object.values(taskMapping).find(task => task.focused)?.id ?? null;
    const newFocusedId = (newValue as CachedTask | null)?.id ?? null;
    if (!newFocusedId) {
      return set(taskAtom, mapValue(taskMapping, ((task) => ({...task, focused: false }))));
    }

    const isToggling = currentlyFocusedTaskId === newFocusedId;
    return set(
      taskAtom,
      mapValue(taskMapping, (task) =>
        task.id === newFocusedId
          ? { ...task, focused: isToggling ? !task.focused : true}
          : { ...task, focused: false }
      )
    );
  },
});

export const taskWithParentIdSelector = selectorFamily<
  CachedTask[],
  string | undefined
>({
  key: "task-with-parent-id-selector",
  get:
    (taskId: string | undefined) =>
    ({ get }) =>
      Object.values(get(taskAtom)).filter((task) => task.parentId === taskId),
});
export default taskAtom;
