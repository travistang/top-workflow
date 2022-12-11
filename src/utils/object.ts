export type Modifier<T extends object, K extends keyof T = keyof T> = (
  field: K
) => (value: T[K]) => void;
