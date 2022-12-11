import { TaskState } from "../entities/Task";

export type ColorConfig = {
  background: string;
  text: string;
};
export const TaskStateColorMapping: Record<TaskState, ColorConfig> = {
  [TaskState.Pending]: {
    background: "bg-text",
    text: "text-text",
  },
  [TaskState.Blocked]: {
    background: "bg-accent",
    text: "text-accent",
  },
  [TaskState.Ignored]: {
    background: "bg-secondary",
    text: "text-secondary",
  },
  [TaskState.Completed]: {
    background: "bg-primary",
    text: "text-primary",
  },
};
