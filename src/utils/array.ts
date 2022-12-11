export const range = (n: number) => {
  if (!n) return [];
  return Array(n)
    .fill(0)
    .map((_, i) => i);
};

export const toggleElement = <T>(arr: T[], element: T) => {
  const isElementInArray = arr.includes(element);
  return isElementInArray
    ? arr.filter((e) => e !== element)
    : [...arr, element];
};

export const addWithoutRepeat = <T>(arr: T[], element: T) => {
  const isElementInArray = arr.includes(element);
  if (isElementInArray) return arr;
  return [...arr, element];
};
