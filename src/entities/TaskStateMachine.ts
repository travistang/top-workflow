import { TaskState as BaseTaskState } from './Task';

export type TaskState = {
  id: string;
  name: string;
  impliedState: BaseTaskState;
};

export type TaskStateTransition = {
  fromId: string;
  toId: string;
  name: string;
};

export type TaskStateMachine = {
  id: string;
  name: string;
  states: TaskState[];
  transitions: TaskStateTransition[];
};
