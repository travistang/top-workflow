import React from "react";
import { TaskStateColorMapping } from "../../domain/TaskState";
import { TaskDTO, TaskState } from "../../entities/Task";
import Dropdown from "./Dropdown";

type Props = {
  task: TaskDTO;
  onChange: (state: TaskState) => void;
  className?: string;
  label?: string;
};

export default function TaskStateDropdown({
  className,
  task,
  label,
  onChange,
}: Props) {
  return (
    <Dropdown
      className={className}
      inputClassName={TaskStateColorMapping[task.state].background}
      value={task.state}
      label={label}
      options={Object.values(TaskState).map((possibleState) => ({
        label: possibleState,
        value: possibleState,
        icon: TaskStateColorMapping[possibleState].icon,
      }))}
      onSelect={onChange}
    />
  );
}
