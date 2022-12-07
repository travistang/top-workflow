import Dexie, { Table } from "dexie";
import {
  getDefaultSortConfig,
  SortConfig,
  SortOrder,
} from "../domain/Filter/SortConfig";
import TaskFilter, { TaskFilterConfig } from "../domain/Filter/TaskFilter";
import { Task, TaskDTO } from "../entities/Task";

class TaskRepository extends Dexie {
  tasks!: Table<TaskDTO>;

  constructor() {
    super("TOP-Workflow-TaskDatabase");
    this.version(1).stores({
      tasks: "++id,name,description,createdAt",
    });
  }

  async get(id: string) {
    const taskDto = await this.tasks.get(id);
    if (!taskDto) return null;
    return new Task(taskDto);
  }

  add(dto: TaskDTO) {
    return this.tasks.add(dto);
  }

  update(id: string, dto: TaskDTO) {
    return this.tasks.update(id, dto);
  }

  async upsert(dto: TaskDTO) {
    const id = dto.id;
    const existingId = await this.get(id);
    if (existingId) {
      return this.update(id, dto);
    } else {
      return this.add(dto);
    }
  }

  remove(id: string) {
    return this.tasks.delete(id);
  }

  private buildFilter(taskFilter: TaskFilter, sorting: SortConfig<Task>) {
    let filter = this.tasks.filter((task) => taskFilter.matches(task));
    if (sorting.limit) {
      filter = filter.limit(sorting.limit);
    }

    if (sorting.sortBy) {
      return sorting.order === SortOrder.ASC
        ? filter.sortBy(sorting.sortBy)
        : filter.reverse().sortBy(sorting.sortBy);
    }

    return filter.toArray();
  }

  async find(
    filterConfig: TaskFilterConfig = {},
    sorting: SortConfig<Task> = getDefaultSortConfig()
  ) {
    const taskFilter = new TaskFilter(filterConfig);
    const taskDtos = await this.buildFilter(taskFilter, sorting);
    return taskDtos.map((dto) => new Task(dto));
  }
}

export default new TaskRepository();
