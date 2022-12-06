import { Filter } from "./filter";

export type ArrayFilterConfig<T> = {
  has?: T[];
  hasNo?: T[];
}
export default class ArrayFilter<T> extends Filter<T[], ArrayFilterConfig<T>> {
  matches(testValue: T[]): boolean {
    if (this.config.has && testValue.some(value => !this.config.has?.includes(value))) {
      return false;
    }
    if (this.config.hasNo && testValue.some(value => this.config.hasNo?.includes(value))) {
      return false;
    }
    return true;
  }
}