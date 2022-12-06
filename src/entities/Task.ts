import TaskRepository from "../repositories/TaskRepository";
import { caseInsensitiveInclude } from "../utils/strings";

export enum TaskState {
  Pending = 'pending',
  Completed = 'completed',
  Ignored = 'ignored',
  Blocked = 'blocked',
};

export interface TaskDTO {
  id: string;
  name: string;
  labels: string[];
  description: string;
  createdAt: number;
  modifiedAt: number;
  subTasksId: string[];
  state: TaskState;
  history: {
    state: TaskState;
    date: number;
  }[];
};

export class Task implements TaskDTO {
  id: string;
  name: string;
  labels: string[];
  description: string;
  createdAt: number;
  modifiedAt: number;
  subTasksId: string[];
  subTasks: Task[];
  state: TaskState;
  history: {
    state: TaskState;
    date: number;
  }[];

  constructor(taskDTO: TaskDTO) {
    this.id = taskDTO.id;
    this.name = taskDTO.name;
    this.labels = taskDTO.labels;
    this.description = taskDTO.description;
    this.createdAt = taskDTO.createdAt;
    this.modifiedAt = taskDTO.modifiedAt;
    this.subTasksId = taskDTO.subTasksId;
    this.state = taskDTO.state;
    this.history = taskDTO.history;
    this.subTasks = [];
  }

  toDTO(): TaskDTO {
    return {
      id: this.id,
      name: this.name,
      labels: this.labels,
      description: this.description,
      createdAt: this.createdAt,
      modifiedAt: this.modifiedAt,
      state: this.state,
      history: this.history,
      subTasksId: this.subTasksId,
    };
  }

  static from(taskDTO: Omit<TaskDTO, "id">): Task {
    const id = window.crypto.randomUUID();
    return new Task({ ...taskDTO, id });
  }

  async populateSubTasks() {
    const subTasks = await Promise.all(this.subTasksId.map(id => TaskRepository.get(id)));
    this.tasks
  }
}