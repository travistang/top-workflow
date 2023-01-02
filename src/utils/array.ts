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

export const isEqual = <T>(a: T[], b: T[], compareFn: (a: T, b: T) => boolean = (a, b) => a === b) => {
  return (
    a.length === b.length &&
    a.every((elA) => b.find((elB) => compareFn(elA, elB))) &&
    b.every((elB) => b.find((elA) => compareFn(elB, elA)))
  );
};
