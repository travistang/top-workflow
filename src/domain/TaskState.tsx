import React from "react";
import {
  VscCheck,
  VscRefresh,
  VscStopCircle,
} from "react-icons/vsc";
import { TaskState } from "../entities/Task";

export type ColorConfig = {
  background: string;
  icon: React.ReactNode;
  text: string;
};

export const TaskStateColorMapping: Record<TaskState, ColorConfig> = {
  [TaskState.Pending]: {
    background: "bg-neutral",
    icon: <VscRefresh />,
    text: "text-text",
  },
  [TaskState.Blocked]: {
    background: "bg-accent bg-opacity-70",
    icon: <VscStopCircle />,
    text: "text-accent",
  },
  [TaskState.Completed]: {
    background: "bg-success bg-opacity-70",
    icon: <VscCheck />,
    text: "text-primary",
  },
};
