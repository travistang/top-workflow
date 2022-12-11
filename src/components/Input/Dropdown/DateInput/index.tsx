import React from "react";
import classNames from "classnames";
import { format, parse } from "date-fns";
import Label from "../../Label";

type Props = {
  className?: string;
  inputClassName?: string;
  label?: string;
  value: number | undefined;
  onChange: (date: number | undefined) => void;
};

const dateFormatString = "yyyy-MM-dd'T'HH:mm";
export default function DateInput({
  inputClassName,
  className,
  label,
  value,
  onChange,
}: Props) {
  const toDateInputFormat = (date: number | undefined) =>
    date ? format(date, dateFormatString) : "";
  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (!dateValue) return onChange(undefined);
    onChange(parse(dateValue, dateFormatString, new Date()).getTime());
  };
  return (
    <div className={classNames("flex flex-col gap-2", className)}>
      <Label text={label} />
      <input
        type="datetime-local"
        className={classNames(
          "outline-none focus:outline-primary placeholder:text-xs flex-1 rounded-lg border-none px-2 bg-text bg-opacity-20 flex-shrink-0 min-h-[36px]",
          inputClassName
        )}
        value={toDateInputFormat(value)}
        onChange={onDateChange}
      />
    </div>
  );
}
