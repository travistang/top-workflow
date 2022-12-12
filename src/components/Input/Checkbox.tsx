import React from 'react';
import classNames from 'classnames';
type Props = {
  className?: string;
  checked?: boolean;
  onCheck: () => void;
};

export default function Checkbox({ onCheck, checked, className }: Props) {
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCheck();
  };
  return (
    <div
      onClick={onClick}
      className={classNames(
        'h-6 w-6 flex-shrink-0 rounded-full border flex items-center justify-center p-1',
        checked && "border-primary",
        className)}>
      {checked && <span className="bg-primary rounded-full h-full w-full" />}
    </div>
  );
}