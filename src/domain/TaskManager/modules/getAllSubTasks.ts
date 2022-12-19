import { CachedTask } from "../../../atoms/tasks";
import { TaskManagerHandler, TaskManagerHandlerProps } from "../types";

const getAllSubTasks: TaskManagerHandler<CachedTask, CachedTask[]> =
  (props: TaskManagerHandlerProps) => (task: CachedTask) => {
    return props.allTasks.filter(
      (maybeSubTask) => task.id === maybeSubTask.parentId
    );
  };

export default getAllSubTasks;