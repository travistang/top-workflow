import classNames from "classnames";
import React from "react";

type Props = {
  isLast?: boolean;
  className?: string;
};
export default function ConnectedLine({ isLast, className }: Props) {
  return (
    <div
      className={classNames(
        "w-4 h-10 border-l-2 border-font -mt-5 mr-2",
        isLast && "border-b-2",
        className
      )}
    />
  );
}
