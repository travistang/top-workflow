export enum TaskState {
  Pending = "pending",
  Completed = "completed",
  Blocked = "blocked",
}

export interface TaskDTO {
  id: string;
  name: string;
  parentId?: string;
  labels: string[];
  description: string;
  createdAt: number;
  modifiedAt: number;
  state: TaskState;
  dueDate?: number;
  order: number;
  history: {
    state: TaskState;
    date: number;
  }[];
}
