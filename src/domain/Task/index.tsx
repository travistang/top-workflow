import { useLiveQuery } from "dexie-react-hooks";
import { TaskDTO } from "../../entities/Task";
import TaskStateMachineRepository from "../../repositories/TaskStateMachineRepository";
import { getTaskStateById } from "../TaskStateMachine";

export const useTaskValidation = (task: TaskDTO | null) => {
  const stateMachineConfig = useLiveQuery(
    () => TaskStateMachineRepository.get(task?.stateMachine?.stateMachineId ?? ''),
    [task?.stateMachine?.stateMachineId]
  );
  if (!task) return false;
  const isUsingStateMachine = !!stateMachineConfig;
  if (!task.name) return false;
  if (!isUsingStateMachine) return true;
  const currentStateInStateMachine = getTaskStateById(stateMachineConfig, task.stateMachine?.stateId ?? '');
  const isValid = !!currentStateInStateMachine;
  return isValid;
}