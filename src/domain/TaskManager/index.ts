import { useRecoilState } from "recoil";
import taskAtom, { CachedTask, mapToCachedTask } from "../../atoms/tasks";
import { TaskState } from "../../entities/Task";
import TaskRepository from "../../repositories/TaskRepository";
import createTask from "./modules/createTask";
import toggleFocus from "./modules/toggleHighlight";
import { TaskManagerHandlerProps } from "./types";

export default function useTaskManager() {
  const [tasks, setTasks] = useRecoilState(taskAtom);
  const allTasks = Object.values(tasks);
  const props: TaskManagerHandlerProps = { tasks, setTasks, allTasks };

  const get = (id: string) => {
    return tasks[id];
  }

  const getAllSubTasks = (task: CachedTask) => {
    return allTasks.filter((maybeSubTask) => task.id === maybeSubTask.parentId);
  };

  const getAllSiblings = (task: CachedTask) => {
    return allTasks.filter(
      (maybeSiblings) => task.parentId === maybeSiblings.parentId
    );
  };

  const upsert = async (...newTasks: CachedTask[]) => {
    const newTasksList = Object.fromEntries(
      newTasks.map((task) => [task.id, mapToCachedTask(task)])
    );
    await Promise.all(newTasks.map((task) => TaskRepository.upsert(task)));
    setTasks({ ...tasks, ...newTasksList });
  };

  const getDerivedState = (task: CachedTask): TaskState | null => {
    const subTasks = getAllSubTasks(task);
    if (task.state !== TaskState.Pending || subTasks.length === 0) return null;
    if (subTasks.some(task => task.state === TaskState.Blocked)) {
      return TaskState.Blocked;
    }

    if (subTasks.every(task => task.state === TaskState.Completed)) {
      return TaskState.Completed;
    };
    return null;
  }

  const getAllParentTasks = () => allTasks.filter((task) => !task.parentId);
  const update = async (id: string, updatedTask: CachedTask) => {
    await TaskRepository.update(id, updatedTask);
    setTasks({ ...tasks, [id]: updatedTask });
  };

  const remove = async (id: string) => {
    const removedIds = await TaskRepository.remove(id);
    const remainingEntries = Object.entries(tasks).filter(([id]) => !removedIds.includes(id));
    setTasks(Object.fromEntries(remainingEntries));
  }

  return {
    get,
    tasks,
    createTask: createTask(props),
    upsert,
    getAllParentTasks,
    update,
    getAllSubTasks,
    getAllSiblings,
    remove,
    getDerivedState,
    toggleFocus: toggleFocus(allTasks),
  };
}
