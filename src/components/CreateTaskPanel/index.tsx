import React from "react";
import CreateItemPanel from "../CreateItemPanel";

type Props = {
  className?: string;
  inputClassName?: string;
  onAddTask: (taskName: string) => void;
  onClose?: () => void;
};
export default function CreateTaskPanel({
  className,
  inputClassName,
  onClose,
  onAddTask,
}: Props) {
  return (
    <CreateItemPanel
      onClose={onClose}
      className={className}
      inputClassName={inputClassName}
      onConfirm={onAddTask}
      placeholder="Something describing your new task..."
    />
  );
}
