export enum TaskState {
  Pending = "pending",
  Completed = "completed",
  Blocked = "blocked",
}

export type TaskStateMachineState = {
  stateMachineId: string;
  stateId: string;
}
export interface TaskDTO {
  id: string;
  name: string;
  parentId?: string[];
  labels: string[];
  description: string;
  createdAt: number;
  modifiedAt: number;
  state: TaskState;
  dueDate?: number;
  flagged?: boolean;
  order: number;
  history: {
    state: TaskState;
    date: number;
  }[];
  stateMachine?: TaskStateMachineState;
}
