import React from "react";
import classNames from "classnames";
import { Option } from "./types";

type Props<T> = {
  onClick?: (value: T) => void;
  option: Option<T>;
  selected?: boolean;
};

export default function DropdownOption<T>({
  selected,
  onClick,
  option,
}: Props<T>) {
  const { label, icon, className } = option;
  const clickHandler = () => {
    onClick?.(option.value);
    option.onSelect?.();
  };
  return (
    <div
      onClick={clickHandler}
      className={classNames(
        "flex items-center gap-2 bg-opacity-0",
        className,
        selected && "bg-text bg-opacity-20 -mx-2 px-2"
      )}
    >
      {icon}
      {label}
    </div>
  );
}
