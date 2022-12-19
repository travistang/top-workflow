import { CachedTask } from "../../../atoms/tasks";
import { TaskManagerHandler } from "../types";

const getStemTasks: TaskManagerHandler<CachedTask, CachedTask[]> = (props) => (task) => {
  const getParent = (task: CachedTask) => task.parentId ? props.tasks[task.parentId] : null;

  const findParentRecursively = (task: CachedTask, parentChain: CachedTask[]): CachedTask[] => {
    const isRoot = !task.parentId;
    if (isRoot) return [task, ...parentChain];
    const parent = getParent(task);
    if (!parent) return parentChain;
    return findParentRecursively(parent, [task, ...parentChain]);
  };

  return findParentRecursively(task, []);
};

export default getStemTasks;
