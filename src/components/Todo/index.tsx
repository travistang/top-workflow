import React from "react";
import classNames from "classnames";
import { Task, TaskState } from "../../entities/Task";
import Checkbox from "../../components/Input/Checkbox";

type Props = {
  task: Task;
  className?: string;
  onMarkComplete: (completed: boolean) => void;
};
export default function Todo({ task, className, onMarkComplete }: Props) {
  const { data } = task;
  return (
    <div className={classNames("flex items-center gap-2", className ?? "h-10")}>
      <Checkbox
        checked={data.state === TaskState.Completed}
        onCheck={() => onMarkComplete(data.state !== TaskState.Completed)}
      />
      <span>{data.name}</span>
    </div>
  );
}
