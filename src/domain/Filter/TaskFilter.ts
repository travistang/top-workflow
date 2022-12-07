import { TaskDTO, TaskState } from "../../entities/Task";
import ArrayFilter, { ArrayFilterConfig } from "./ArrayFilter";
import { Filter } from "./filter";
import NumberFilter from "./NumberFilter";
import { GenericFilterConfig } from "./ObjectFilter";
import StringFilter from "./StringFilter";

export type TaskFilterConfig = Partial<
  Omit<GenericFilterConfig<TaskDTO>, "state"> & {
    state: ArrayFilterConfig<TaskState>;
  }
>;

export default class TaskFilter extends Filter<TaskDTO, TaskFilterConfig> {
  matches(testValue: TaskDTO): boolean {
    if (
      this.config.name &&
      !new StringFilter(this.config.name).matches(testValue.name)
    ) {
      return false;
    }
    if (
      this.config.description &&
      !new StringFilter(this.config.description).matches(testValue.description)
    ) {
    }
    if (
      this.config.state &&
      !new ArrayFilter(this.config.state).matches([testValue.state])
    ) {
      return false;
    }
    if (
      this.config.createdAt &&
      !new NumberFilter(this.config.createdAt).matches(testValue.createdAt)
    ) {
      return false;
    }

    return true;
  }
}
