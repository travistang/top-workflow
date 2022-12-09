export const range = (n: number) => {
  if (!n) return [];
  return Array(n)
    .fill(0)
    .map((_, i) => i);
};
