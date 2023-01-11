import React from "react";
import classNames from "classnames";
import { TaskStateColorMapping } from "../../../domain/TaskState";
import { TaskState } from "../../../entities/TaskStateMachine";
import Label from "../../Input/Label";

type Props = {
  state: TaskState;
  className?: string;
};
export default function SelectedStatePreview({ state, className }: Props) {
  const impliedStateStyle = TaskStateColorMapping[state.impliedState];
  return (
    <div className={classNames("flex flex-col items-stretch", className)}>
      <Label text="Task is at state" />
      <div
        className={classNames(
          "rounded-lg border border-text px-2 flex whitespace-nowrap items-center",
          impliedStateStyle.background,
          className
        )}
      >
        {state.name}
      </div>
    </div>
  );
}
