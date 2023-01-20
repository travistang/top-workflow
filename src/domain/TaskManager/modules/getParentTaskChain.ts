import { CachedTask } from "../../../atoms/tasks";
import { TaskManagerHandler } from "../types";

const getParentTaskChain: TaskManagerHandler<CachedTask, CachedTask[]> = (props) => (task) => {
  const getParent = (task: CachedTask) => task.parentId ? props.tasks[task.parentId[0]] : null;

  const findParentRecursively = (task: CachedTask, parentChain: CachedTask[]): CachedTask[] => {
    const isRoot = !task.parentId && parentChain.length === 0;
    if (isRoot) return [];
    const parent = getParent(task);
    if (!parent) return parentChain;
    return findParentRecursively(parent, [parent, ...parentChain]);
  };

  return findParentRecursively(task, []);
};

export default getParentTaskChain;
