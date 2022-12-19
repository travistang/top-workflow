import { CachedTask } from "../../../atoms/tasks";
import { TaskState } from "../../../entities/Task";
import { TaskManagerHandler, TaskManagerHandlerProps } from "../types";
import getAllSubTasks from "./getAllSubTasks";

const getDerivedState: TaskManagerHandler<CachedTask, TaskState | null> = (props: TaskManagerHandlerProps) => (task: CachedTask) => {
  const subTasks = getAllSubTasks(props)(task);
  if (task.state !== TaskState.Pending || subTasks.length === 0) return null;
  if (subTasks.some((task) => task.state === TaskState.Blocked)) {
    return TaskState.Blocked;
  }

  if (subTasks.every((task) => task.state === TaskState.Completed)) {
    return TaskState.Completed;
  }
  return null;
};

export default getDerivedState;