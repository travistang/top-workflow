export enum TaskState {
  Pending = "pending",
  Completed = "completed",
  Ignored = "ignored",
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
  history: {
    state: TaskState;
    date: number;
  }[];
}
