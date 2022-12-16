import { atom, selectorFamily } from "recoil";
import { SortOrder } from "../domain/Filter/SortConfig";
import { TaskDTO } from "../entities/Task";
import TaskRepository from "../repositories/TaskRepository";

export type CachedTask = TaskDTO & {
  focused: boolean;
}

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
export default taskAtom;
