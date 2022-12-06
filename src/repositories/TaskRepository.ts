import Dexie, { Table } from "dexie";
import TaskFilter from "../domain/Filter/TaskFilter";
import { TaskDTO } from "../entities/Task";

class TaskRepository extends Dexie {
  tasks!: Table<TaskDTO>;

  constructor() {
    super("TOP-Workflow-TaskDatabase");
    this.version(1).stores({
      tasks: "++id,name,description,createdAt"
    });
  }

  get(id: string) {
    return this.tasks.get(id);
  }

  add(dto: TaskDTO) {
    return this.tasks.add(dto);
  }
  update(id: string, dto: TaskDTO) {
    return this.tasks.update(id, dto);
  }

  remove(id: string) {
    return this.tasks.delete(id);
  }

  find(taskFilter: TaskFilter) {
    return this.tasks.filter(task => taskFilter.matches(task));
  }
};

export default new TaskRepository();