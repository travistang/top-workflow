import Dexie, { Table } from "dexie";
import {
  getDefaultSortConfig,
  SortConfig,
  SortOrder,
} from "../domain/Filter/SortConfig";
import TaskFilter, { TaskFilterConfig } from "../domain/Filter/TaskFilter";
import { TaskDTO, TaskState } from "../entities/Task";

class TaskRepository extends Dexie {
  tasks!: Table<TaskDTO>;

  constructor() {
    super("TOP-Workflow-TaskDatabase");
    this.version(1).stores({
      tasks: "++id,name,description,createdAt",
    });
  }

  async get(id: string) {
    return this.tasks.get(id);
  }

  add(dto: TaskDTO) {
    return this.tasks.add(dto);
  }

  private async computeOrder(parentId?: string) {
    const filterConfig: TaskFilterConfig = {
      parentId: parentId ? { equals: parentId } : { exists: false },
    };

    const siblingTasks = await this.find(filterConfig);
    return (siblingTasks.map(sibling => sibling.order).sort().pop() ?? 0) + 1;
  }

  async createTaskByName(name: string, parentId?: string) {
    const now = Date.now();
    const newTaskDto: TaskDTO = {
      name,
      parentId,
      description: "",
      labels: [],
      createdAt: now,
      modifiedAt: now,
      state: TaskState.Pending,
      order: await this.computeOrder(parentId),
      history: [{ state: TaskState.Pending, date: now }],
      id: window.crypto.randomUUID(),
    };
    await this.add(newTaskDto);
    return newTaskDto;
  }

  update(id: string, dto: TaskDTO) {
    return this.tasks.update(id, dto);
  }

  async upsert(dto: TaskDTO) {
    const id = dto.id;
    const existingRecord = await this.get(id);
    if (existingRecord) {
      return this.update(id, dto);
    } else {
      return this.add(dto);
    }
  }

  async remove(id: string) {
    const subTasksOfTask = await this.find({ parentId: {equals: id} });
    const removingIds = [...subTasksOfTask.map((subTask) => subTask.id), id];
    await this.tasks.bulkDelete(removingIds);
    return removingIds;
  }

  private buildFilter(taskFilter: TaskFilter, sorting: SortConfig<TaskDTO>) {
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
    sorting: SortConfig<TaskDTO> = {
      ...getDefaultSortConfig(),
      sortBy: "order",
    }
  ) {
    const taskFilter = new TaskFilter(filterConfig);
    const taskDtos = await this.buildFilter(taskFilter, sorting);
    return taskDtos;
  }
}

export default new TaskRepository();
