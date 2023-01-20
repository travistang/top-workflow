import { CachedTask } from "../../../atoms/tasks";
import { TaskManagerHandler, TaskManagerHandlerProps } from "../types";

const getAllSubTasks: TaskManagerHandler<CachedTask, CachedTask[]> =
  (props: TaskManagerHandlerProps) => (task: CachedTask) => {
    return props.allTasks.filter(
      (maybeSubTask) => maybeSubTask.parentId?.includes(task.id),
    );
  };

export default getAllSubTasks;