import classNames from "classnames";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import DropdownOption from "./DropdownOption";
import { Option } from "./types";

type Props<T> = {
  inputClassName?: string;
  dropdownClassName?: string;
  className?: string;
  children?: React.ReactNode;
  label?: string;
  value: T;
  onSelect?: (value: T) => void;
  options: Option<T>[];
};
export default function Dropdown<T>({
  options,
  className,
  inputClassName,
  children,
  dropdownClassName,
  label,
  value,
  onSelect,
}: Props<T>) {
  const [expanded, setExpanded] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);
  const onSelectWithClose = (value: T) => {
    onSelect?.(value);
    setExpanded(false);
  };
  return (
    <OutsideClickHandler
      display="contents"
      onOutsideClick={() => setExpanded(false)}
    >
      <div
        className={classNames(
          "relative bg-opacity-0 flex flex-col gap-2 items-stretch",
          className
        )}
      >
        {label && <label className="text-xs">{label}</label>}
        <div
          onClick={() => setExpanded(!expanded)}
          className={classNames(
            "rounded-lg min-h-[36px] w-full px-2 flex items-center",
            inputClassName ?? "bg-text bg-opacity-20"
          )}
        >
          {children ??
            (selectedOption && <DropdownOption option={selectedOption} />)}
        </div>
        {expanded && (
          <div
            className={classNames(
              "absolute top-full translate-y-1 w-full left-0 flex flex-col items-stretch gap-2 p-2 rounded-lg bg-text-secondary",
              dropdownClassName
            )}
          >
            {options.map((option) => (
              <DropdownOption
                selected={option.value === value}
                onClick={onSelectWithClose}
                key={JSON.stringify(option.value)}
                option={option}
              />
            ))}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}
