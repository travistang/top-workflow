import { CachedTask } from "../atoms/tasks";
import { isEqual as isArrayEqual } from "./array";

export const isEqual = (a: CachedTask, b: CachedTask) => {
  const areLabelsEqual = isArrayEqual(a.labels, b.labels);
  return (
    a.id === b.id &&
    a.name === b.name &&
    a.description === b.description &&
    a.state === b.state &&
    areLabelsEqual
  );
}