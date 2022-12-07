import TaskRepository from "../repositories/TaskRepository";

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
  history: {
    state: TaskState;
    date: number;
  }[];
}

export class Task {
  data: TaskDTO;
  constructor(taskDTO: TaskDTO) {
    this.data = taskDTO;
  }

  static from(taskDTO: Partial<Omit<TaskDTO, "id">>): Task {
    const id = window.crypto.randomUUID();
    const defaultDto: TaskDTO = {
      id,
      name: "",
      labels: [],
      description: "",
      createdAt: Date.now(),
      modifiedAt: Date.now(),
      state: TaskState.Pending,
      history: [
        {
          state: TaskState.Pending,
          date: Date.now(),
        },
      ],
    };
    return new Task({ ...defaultDto, ...taskDTO, id });
  }

  async subTasks(): Promise<Task[]> {
    return TaskRepository.find({
      parentId: { equals: this.data.id },
    });
  }
}
