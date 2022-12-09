import { atom, selectorFamily } from "recoil";

export const expandedTaskAtom = atom<string[]>({
  key: "expanded-task",
  default: [],
});

export const shouldExpand = selectorFamily({
  key: "should-expand-selector",
  get:
    (id: string) =>
    ({ get }) => {
      // TODO: this
      return false;
    },
});
