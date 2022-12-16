import { atom, useRecoilState } from "recoil";
import { addWithoutRepeat, toggleElement } from "../utils/array";

export const expandedTaskAtom = atom<string[]>({
  key: "expanded-task",
  default: [],
});

export const useExpandTask = (taskId: string, forceState?: boolean) => {
  const [expandedTasksId, setExpandedTaskAtom] =
    useRecoilState(expandedTaskAtom);

  return () => {
    if (forceState !== undefined) {
      const newExpandedTasksId = forceState
        ? addWithoutRepeat(expandedTasksId, taskId)
        : expandedTasksId.filter((id) => id !== taskId);
      setExpandedTaskAtom(newExpandedTasksId);
      return;
    }
    setExpandedTaskAtom(toggleElement(expandedTasksId, taskId));
  };
};
