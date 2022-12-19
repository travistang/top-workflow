import { CachedTask } from "../../../atoms/tasks";
import { TaskState } from "../../../entities/Task";
import { TaskManagerHandler, TaskManagerHandlerProps } from "../types";
import getAllSubTasks from "./getAllSubTasks";
import getDerivedState from "./getDerivedState";

const getStemTasks: TaskManagerHandler<void, CachedTask[]> =
  (props: TaskManagerHandlerProps) => () => {
    const { allTasks } = props;
    const isStemTask = (task: CachedTask) => {
      const subTasks = getAllSubTasks(props)(task);
      const derivedState = getDerivedState(props)(task);
      if (task.state === TaskState.Completed) return false;
      if (derivedState === TaskState.Completed) return true;
      return subTasks.length === 0;
    }

    return allTasks.filter(isStemTask);
  };

export default getStemTasks;