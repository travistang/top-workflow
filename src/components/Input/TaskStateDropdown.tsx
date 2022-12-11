import React from "react";
import { capitalize } from "../../utils/strings";
import { TaskStateColorMapping } from "../../domain/TaskState";
import { TaskState } from "../../entities/Task";
import Dropdown from "./Dropdown";

type Props = {
  value: TaskState;
  onChange: (state: TaskState) => void;
  className?: string;
  label?: string;
};

export default function TaskStateDropdown({
  className,
  value,
  label,
  onChange,
}: Props) {
  const options = Object.entries(TaskStateColorMapping).map(
    ([taskState, options]) => ({
      value: taskState as TaskState,
      icon: options.icon,
      className: options.text,
      label: capitalize(taskState as string),
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
