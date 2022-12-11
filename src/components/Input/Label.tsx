import classNames from "classnames";
import React from "react";

type Props = {
  className?: string;
  text?: string;
};
export default function Label({ className, text }: Props) {
  if (!text) return null;

  return (
    <span
      className={classNames(
        "text-xs bg-opacity-0 bg-background items-center",
        className
      )}
    >
      {text}
    </span>
  );
}
