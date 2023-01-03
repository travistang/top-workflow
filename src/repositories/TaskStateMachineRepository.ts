import Dexie, { Table } from "dexie";
import { TaskState, TaskStateMachine } from "../entities/TaskStateMachine";

class TaskStateMachineRepository extends Dexie {
  stateMachines!: Table<TaskStateMachine>;

  constructor() {
    super("TOP-Workflow-TaskStateMachine");
    this.version(1).stores({
      stateMachines: "++id,name",
    });
  }

  async getAll() {
    return this.stateMachines.toArray();
  }

  async get(id: string) {
    return this.stateMachines.get(id);
  }

  async add(stateMachinesConfig: Omit<TaskStateMachine, "id">) {
    const id = window.crypto.randomUUID();
    return await this.stateMachines.add({
      ...stateMachinesConfig,
      id,
    });
  }

  async edit(id: string, stateMachinesConfig: Omit<TaskState, "id">) {
    return this.stateMachines.update(id, stateMachinesConfig);
  }

  async remove(id: string) {
    return this.stateMachines.delete(id);
  }

  async search(searchString: string) {
    return this.stateMachines
      .where("name")
      .startsWithIgnoreCase(searchString)
      .toArray();
  }
}

export default new TaskStateMachineRepository();
