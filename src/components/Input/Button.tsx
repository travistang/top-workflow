import React from "react";
import classNames from "classnames";

type Props = {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
};
export default function Button({ children, className, onClick }: Props) {
  const guardedOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      onClick={guardedOnClick}
      className={classNames("flex items-center justify-center", className)}
    >
      {children}
    </button>
  );
}
