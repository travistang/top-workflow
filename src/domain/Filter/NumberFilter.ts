import { Filter } from "./filter";

export type NumberFilterConfig = {
  gte?: number;
  eq?: number;
  lte?: number;
};
export default class NumberFilter extends Filter<number, NumberFilterConfig> {
  matches(testValue: number): boolean {
    if (this.config.gte !== undefined && this.config.gte < testValue) {
      return false;
    }
    if (this.config.lte !== undefined && this.config.lte > testValue) {
      return false;
    }
    if (this.config.eq !== undefined && this.config.eq !== testValue) {
      return false;
    }
    return true;
  }
}