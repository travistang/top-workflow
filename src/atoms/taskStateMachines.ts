import { atom } from "recoil";
import { TaskStateMachine } from "../entities/TaskStateMachine";

export type TaskStateMachineAtomValue = Record<string, TaskStateMachine>;
export const taskStateMachinesAtom = atom<TaskStateMachineAtomValue>({
  key: 'task-state-machine-atom',
  default: {},
});