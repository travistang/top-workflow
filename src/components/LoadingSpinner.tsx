import classNames from 'classnames';
import React from 'react';
import { VscLoading } from 'react-icons/vsc';

type Props = {
  className?: string;
}
export default function LoadingSpinner({ className}: Props) {
  return (
    <div className={classNames('flex items-center justify-center animate-spin', className)}>
      <VscLoading />
    </div>
  )
}