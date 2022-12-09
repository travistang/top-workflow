import { Filter } from "./filter";

export type StringFilterConfig = {
  contains?: string;
  equals?: string;
  exists?: boolean;
};

export default class StringFilter extends Filter<
  string | undefined,
  StringFilterConfig
> {
  matches(testValue: string | undefined): boolean {
    if (this.config.exists !== undefined) {
      const hasValue = testValue !== undefined;
      return (
        (hasValue && this.config.exists) || (!hasValue && !this.config.exists)
      );
    }

    if (this.config.contains) {
      return !!testValue
        ?.toLowerCase()
        .includes(this.config.contains.toLowerCase());
    }
    if (this.config.equals) {
      return testValue === this.config.equals;
    }
    return true;
  }
}
