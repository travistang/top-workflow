export enum InRangeMode {
  IncludeLowerBound,
  IncludeUpperBound,
  IncludeLowerUpperBound,
  ExcludeAll,
}
export const inRange = (
  range: [number, number],
  value: number,
  mode = InRangeMode.ExcludeAll
) => {
  const [low, high] = range;
  switch (mode) {
    case InRangeMode.ExcludeAll:
      return low < value && value < high;
    case InRangeMode.IncludeLowerBound:
      return low <= value && value < high;
    case InRangeMode.IncludeUpperBound:
      return low < value && value <= high;
    case InRangeMode.IncludeLowerUpperBound:
      return low <= value && value <= high;
  }
};

export const sum = (numbers: number[]) =>
  numbers.reduce((total, n) => total + n, 0);

export const average = (numbers: number[]) => {
  return numbers.length === 0 ? 0 : sum(numbers) / numbers.length;
};
