import classNames from 'classnames';
import React from 'react';
import { VscClose } from 'react-icons/vsc';
import Button from '../Input/Button';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
}
export default function Modal({ onClose, className,children}: Props) {
  return (
    <div
      onClick={onClose}
      className={classNames("z-40 fixed inset-0 flex flex-col justify-end items-stretch backdrop-blur-lg bg-background bg-opacity-20 sm:justify-center sm:px-[10vw]", className)}
    >
      <div className="flex items-center justify-end py-2 bg-opacity-0">
        <Button onClick={onClose} className="w-8 h-8">
          <VscClose />
        </Button>
      </div>
      {children}
    </div>
  )
}