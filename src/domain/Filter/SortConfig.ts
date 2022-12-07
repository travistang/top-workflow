export enum SortOrder {
  ASC = "ascending",
  DSC = "descending",
}

export type SortConfig<T> = {
  sortBy: keyof T | null;
  order: SortOrder;
  limit?: number;
};

export const getDefaultSortConfig = <T>(): SortConfig<T> => {
  return {
    sortBy: null,
    order: SortOrder.ASC,
  };
};
