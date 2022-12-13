import classNames from "classnames";
import React from "react";
import Label from "./Label";

type Props = {
  value: string;
  label?: string;
  onChange: (v: string) => void;
  className?: string;
  textarea?: boolean;
  inputClassName?: string;
  placeholder?: string;
};
export default function TextInput({
  value,
  label,
  onChange,
  placeholder,
  className,
  inputClassName,
  textarea,
}: Props) {
  const finalInputClassName = classNames(
    "outline-none focus:outline-primary placeholder:text-xs flex-1 rounded-lg border-none px-2 bg-text bg-opacity-20 flex-shrink-0 min-h-[36px]",
    inputClassName
  );

  return (
    <div className={classNames("flex flex-col gap-2 bg-opacity-0", className)}>
      <Label text={label} />
      {textarea ? (
        <textarea
          placeholder={placeholder}
          className={finalInputClassName}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <input
          placeholder={placeholder}
          className={finalInputClassName}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
