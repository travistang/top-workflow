import { atom } from "recoil";
import { Task } from "../entities/Task";
import TaskRepository from "../repositories/TaskRepository";

export type TaskAtomValue = Record<string, Task>;
const getAtomDefaultValue = async () => {
  const existingTasks = await TaskRepository.find();
  return Object.fromEntries(existingTasks.map((task) => [task.data.id, task]));
};

const taskAtom = atom<TaskAtomValue>({
  key: "atom",
  default: getAtomDefaultValue(),
});

export default taskAtom;
