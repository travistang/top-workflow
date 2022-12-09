import { atom } from "recoil";
import { SortOrder } from "../domain/Filter/SortConfig";
import { TaskDTO } from "../entities/Task";
import TaskRepository from "../repositories/TaskRepository";

export type TaskAtomValue = Record<string, TaskDTO>;
const getAtomDefaultValue = async () => {
  const pendingTasksByDate = await TaskRepository.find(
    {},
    {
      sortBy: "modifiedAt",
      order: SortOrder.DSC,
    }
  );
  const tasksMappingById = Object.fromEntries(
    pendingTasksByDate.map((task) => [task.id, task])
  );
  console.log({ tasksMappingById });
  return tasksMappingById;
};

const taskAtom = atom<TaskAtomValue>({
  key: "atom",
  default: getAtomDefaultValue(),
});

export default taskAtom;
