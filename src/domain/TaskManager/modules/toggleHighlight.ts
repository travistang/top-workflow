import { CachedTask } from "../../../atoms/tasks";

const toggleFocus = (allTasks: CachedTask[]) => (taskId: string) => {
  const isAlreadyFocused = !!allTasks.find(task => task.id === taskId)?.focused;
  return allTasks.map(task => task.id === taskId ? ({
    ...task,
    focused: !isAlreadyFocused
  }) : task);
};

export default toggleFocus;