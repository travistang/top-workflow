import { XYPosition } from 'reactflow';
import { TaskState as BaseTaskState } from './Task';

export type TaskState = {
  id: string;
  name: string;
  impliedState: BaseTaskState;
  position: XYPosition;
};

export type TaskStateMachineLayout = {
  id: string;
  states: {
    id: string;
    coordinates: [number, number];
  };
};

export type TaskStateTransition = {
  id: string;
  fromId: string;
  toId: string;
  name?: string;
};

export type TaskStateMachine = {
  id: string;
  name: string;
  states: TaskState[];
  transitions: TaskStateTransition[];
};
