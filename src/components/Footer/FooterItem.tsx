import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  path: string;
  className?: string;
};
export default function FooterItem({ className, children, path }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const highlighted = location.pathname === path;

  return (
    <div
      onClick={() => navigate(path)}
      className={classNames(
        'font-bold flex items-center justify-center flex-1 h-full cursor-pointer',
        'sm:w-14',
        highlighted && 'text-primary',
        className
      )}
    >
      {children}
    </div>
  );
}