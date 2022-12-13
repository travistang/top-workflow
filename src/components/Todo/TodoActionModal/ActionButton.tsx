import React from 'react';

type Props = {
  icon: React.FC<{ className?: string; }>;
  label: string;
  onClick?: () => void;
};

export default function ActionButton({ icon: Icon, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="col-span-2 rounded-lg flex flex-col items-center justify-center gap-2 bg-text-secondary p-2 sm:p-16 hover:bg-text hover:bg-opacity-20"
    >
      {<Icon className="w-6 h-6 sm:w-10 sm:h-10" />}
      {label}
    </button>
  );
}