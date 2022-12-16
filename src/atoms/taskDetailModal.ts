import { atom } from "recoil";
import { CachedTask } from "./tasks";

export const taskDetailModalAtom = atom<CachedTask | null>({
  key: "task-detail-modal",
  default: null,
});
