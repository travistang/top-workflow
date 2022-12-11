export type Option<T> = {
  label: string;
  value: T;
  icon?: React.ReactNode;
  onSelect?: () => void;
  className?: string;
};
