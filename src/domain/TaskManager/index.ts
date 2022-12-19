import { useRecoilState } from "recoil";
import taskAtom, { CachedTask, mapToCachedTask } from "../../atoms/tasks";
import TaskRepository from "../../repositories/TaskRepository";
import createTask from "./modules/createTask";
import getAllSubTasks from "./modules/getAllSubTasks";
import getDerivedState from "./modules/getDerivedState";
import getParentTaskChain from "./modules/getParentTaskChain";
import getStemTasks from "./modules/getStemTasks";
import toggleFocus from "./modules/toggleHighlight";
import { TaskManagerHandlerProps } from "./types";

export default function useTaskManager() {
  const [tasks, setTasks] = useRecoilState(taskAtom);
  const allTasks = Object.values(tasks);
  const props: TaskManagerHandlerProps = { tasks, setTasks, allTasks };

  const get = (id: string) => {
    return tasks[id];
  }

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
    getStemTasks: getStemTasks(props),
    getParentTaskChain: getParentTaskChain(props),
    upsert,
    update,
    getAllSubTasks: getAllSubTasks(props),
    getAllSiblings,
    remove,
    getDerivedState: getDerivedState(props),
    toggleFocus: toggleFocus(allTasks),
  };
}
