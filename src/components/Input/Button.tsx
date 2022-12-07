import React, { useState } from "react";
import classNames from "classnames";

type Props = {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
};
export default function Button({ children, className, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={classNames("flex items-center justify-center", className)}
    >
      {children}
    </button>
  );
}
