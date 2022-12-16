export type Modifier<T extends object, K extends keyof T = keyof T> = (
  field: K
) => (value: T[K]) => void;

export const mapValue = <K extends string | number | symbol, V, F = V>(mapping: Record<K, V>, mapFn: (value: V) => F) => {
  const mappedEntries = Object.entries(mapping).map(([key, value]) => [key, mapFn(value as V)]) as [K, F][];
  return Object.fromEntries(mappedEntries);
}