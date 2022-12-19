import { CachedTask } from "../../../atoms/tasks";
import { TaskState } from "../../../entities/Task";
import { TaskManagerHandler, TaskManagerHandlerProps } from "../types";
import getAllSubTasks from "./getAllSubTasks";
import getDerivedState from "./getDerivedState";
import getParentTaskChain from "./getParentTaskChain";

const getStemTasks: TaskManagerHandler<void, CachedTask[]> =
  (props: TaskManagerHandlerProps) => () => {
    const { allTasks } = props;
    const focusedTask = allTasks.find(task => task.focused);
    const isUnderFocusedTask = (task: CachedTask) => {
      if (!focusedTask) return false;
      if (focusedTask.id === task.id) return true;

      const parentChain = getParentTaskChain(props)(task);
      return parentChain.some(parent => parent.id === focusedTask.id);
    }
    const isStemTask = (task: CachedTask) => {
      if (focusedTask && !isUnderFocusedTask(task)) return false;
      const subTasks = getAllSubTasks(props)(task);
      const derivedState = getDerivedState(props)(task);
      if (task.state === TaskState.Completed) return false;
      if (derivedState === TaskState.Completed) return true;
      return subTasks.length === 0;
    }

    return allTasks.filter(isStemTask);
  };

export default getStemTasks;