import { Filter } from "./filter";

export type StringFilterConfig = {
  contains?: string;
  equals?: string;
};

export default class StringFilter extends Filter<string, StringFilterConfig> {
  matches(testValue: string): boolean {
    if (this.config.contains) {
      return testValue.toLowerCase().includes(this.config.contains.toLowerCase());
    }
    if (this.config.equals) {
      return testValue === this.config.equals;
    }
    return true;
  }
}