import React from "react";
import {
  VscRefresh,
  VscCheck,
  VscStopCircle,
  VscSyncIgnored,
} from "react-icons/vsc";
import { TaskState } from "../../entities/Task";
import Dropdown from "./Dropdown";

type Props = {
  value: TaskState;
  onChange: (state: TaskState) => void;
  className?: string;
  label?: string;
};

const TaskStateOptionMapping: Record<
  TaskState,
  {
    label: string;
    icon: React.ReactNode;
    className: string;
  }
> = {
  [TaskState.Pending]: {
    label: "Pending",
    icon: <VscRefresh />,
    className: "text-text",
  },
  [TaskState.Blocked]: {
    label: "Blocked",
    icon: <VscStopCircle />,
    className: "text-accent",
  },
  [TaskState.Ignored]: {
    label: "Ignored",
    icon: <VscSyncIgnored />,
    className: "text-secondary",
  },
  [TaskState.Completed]: {
    label: "Completed",
    icon: <VscCheck />,
    className: "text-primary",
  },
};

export default function TaskStateDropdown({
  className,
  value,
  label,
  onChange,
}: Props) {
  const options = Object.entries(TaskStateOptionMapping).map(
    ([taskState, options]) => ({
      value: taskState as TaskState,
      ...options,
    })
  );
  return (
    <Dropdown
      className={className}
      value={value}
      label={label}
      options={options}
      onSelect={onChange}
    />
  );
}
