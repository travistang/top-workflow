import { atom } from "recoil";

export const expandedTaskAtom = atom<string | null>({
  key: "expanded-task",
  default: null,
});
