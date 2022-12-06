import ArrayFilter from "./ArrayFilter";
import { NumberFilterConfig } from "./NumberFilter";
import { StringFilterConfig } from "./StringFilter";

export type ObjectFilterConfig<T extends object> = {
  [K in keyof T]?: GenericFilterConfig<T[K]>;
};

export type GenericFilterConfig<T> = T extends number
  ? NumberFilterConfig
  : T extends string
  ? StringFilterConfig
  : T extends Array<infer E>
  ? ArrayFilter<E>
  : T extends object
  ? ObjectFilterConfig<T>
  : T;
