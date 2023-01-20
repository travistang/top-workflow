import React from "react";
import {
  VscCheck,
  VscRefresh,
  VscStopCircle,
} from "react-icons/vsc";
import { CachedTask } from "../atoms/tasks";
import { TaskState } from "../entities/Task";
import { useTaskStateMachineOfTask } from "./TaskStateMachine";

export type ColorConfig = {
  background: string;
  icon: React.ReactNode;
  text: string;
};

export const TaskStateColorMapping: Record<TaskState, ColorConfig> = {
  [TaskState.Pending]: {
    background: "bg-text-secondary",
    icon: <VscRefresh />,
    text: "text-text",
  },
  [TaskState.Blocked]: {
    background: "bg-accent bg-opacity-70",
    icon: <VscStopCircle />,
    text: "text-accent",
  },
  [TaskState.Completed]: {
    background: "bg-primary bg-opacity-70",
    icon: <VscCheck />,
    text: "text-primary",
  },
};

export const useComputedState = (task: CachedTask) => {
  const { currentState } = useTaskStateMachineOfTask(task);
  return currentState?.impliedState ?? task.state;
}