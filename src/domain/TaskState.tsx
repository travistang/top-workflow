import React from "react";
import {
  VscCheck,
  VscRefresh,
  VscStopCircle,
  VscSyncIgnored,
} from "react-icons/vsc";
import { TaskState } from "../entities/Task";

export type ColorConfig = {
  background: string;
  icon: React.ReactNode;
  text: string;
};
export const TaskStateColorMapping: Record<TaskState, ColorConfig> = {
  [TaskState.Pending]: {
    background: "bg-text",
    icon: <VscRefresh />,
    text: "text-text",
  },
  [TaskState.Blocked]: {
    background: "bg-accent",
    icon: <VscStopCircle />,
    text: "text-accent",
  },
  [TaskState.Ignored]: {
    background: "bg-secondary",
    icon: <VscSyncIgnored />,
    text: "text-secondary",
  },
  [TaskState.Completed]: {
    background: "bg-primary",
    icon: <VscCheck />,
    text: "text-primary",
  },
};
