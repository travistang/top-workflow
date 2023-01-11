import React from "react";
import classNames from "classnames";

export enum ButtonTheme {
  Danger = 1,
  Success,
  Warning,
  Secondary,
}

type Props = {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  theme?: ButtonTheme;
};

const ButtonThemeClassMapping: Record<ButtonTheme, string> = {
  [ButtonTheme.Danger]: "bg-danger bg-opacity-10 text-danger",
  [ButtonTheme.Success]: "bg-primary bg-opacity-10 text-primary",
  [ButtonTheme.Warning]: "bg-accent bg-opacity-10 text-accent",
  [ButtonTheme.Secondary]: "bg-secondary",
};

export default function Button({ children, className, onClick, theme }: Props) {
  const guardedOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      onClick={guardedOnClick}
      className={classNames(
        "flex items-center justify-center rounded-lg",
        theme && ButtonThemeClassMapping[theme],
        className
      )}
    >
      {children}
    </button>
  );
}
