import classNames from "classnames";
import React from "react";
import Label from "./Label";

type InputProps = {
  textarea?: false,
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
}
type TextAreaProps = {
  textarea: true,
  inputRef?: React.MutableRefObject<HTMLTextAreaElement | null>;
}

type Props = {
  value: string;
  label?: string;
  onChange: (v: string) => void;
  className?: string;
  textarea?: boolean;
  inputClassName?: string;
  placeholder?: string;
} & (InputProps | TextAreaProps);
export default function TextInput({
  inputRef,
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
          ref={inputRef}
          placeholder={placeholder}
          className={finalInputClassName}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <input
          ref={inputRef}
          placeholder={placeholder}
          className={finalInputClassName}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
