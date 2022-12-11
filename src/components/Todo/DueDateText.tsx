import React from "react";
import { format, differenceInDays } from "date-fns";
import { VscWarning } from "react-icons/vsc";
import classNames from "classnames";

type Props = {
  dueDate: number;
};

const getText = (dueDate: number) => {
  const now = Date.now();
  const diffInDays = Math.round(Math.abs(differenceInDays(dueDate, now)));
  const isBefore = dueDate < now;

  if (diffInDays > 10) {
    return format(dueDate, "dd/MM HH:mm");
  }
  if (diffInDays >= 1) {
    return isBefore ? `${diffInDays} days ago` : `In ${diffInDays} days`;
  }
  return `at ${format(dueDate, "HH:mm")}`;
};
export default function DueDateText({ dueDate }: Props) {
  const text = getText(dueDate);
  const isBefore = dueDate < Date.now();

  return (
    <span
      className={classNames(
        "text-xs text-opacity-80 flex items-center gap-1",
        isBefore ? "text-accent" : "text-primary"
      )}
    >
      <VscWarning />
      {text}
    </span>
  );
}
