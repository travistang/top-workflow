import { CachedTask } from "../../atoms/tasks";

export type TaskManagerHandlerProps = {
  allTasks: CachedTask[];
  tasks: Record<string, CachedTask>;
  setTasks: (newMapping: Record<string, CachedTask>) => void;
}
export type TaskManagerHandler<T> = (props: TaskManagerHandlerProps) => (moduleProps: T) => Promise<void>;