import { atom } from "recoil";
import { TaskDTO } from "../entities/Task";

export const taskDetailModalAtom = atom<TaskDTO | null>({
  key: "task-detail-modal",
  default: null,
});
