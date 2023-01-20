import { CachedTask } from "../../../atoms/tasks";
import { TaskManagerHandler } from "../types";

const getRootTasks: TaskManagerHandler<void, CachedTask[]> = (props) => () => {
  return props.allTasks.filter(task => !task.parentId || task.parentId.length === 0);
};

export default getRootTasks;