import { atom, useRecoilState, useRecoilValue } from "recoil";
import taskAtom from "./tasks";

export const expandedTaskAtom = atom<string[]>({
  key: "expanded-task",
  default: [],
});

export const useToggleExpandAll = (toggleTaskId: string) => {
  const tasksMap = useRecoilValue(taskAtom);
  const [expandedTasksId, setExpandedTaskAtom] =
    useRecoilState(expandedTaskAtom);
  const tasks = Object.values(tasksMap);
  const getSubTasks = (taskId: string): string[] => {
    const subTasks = tasks
      .filter((task) => task.parentId === taskId)
      .map((task) => task.id);
    return [taskId, ...subTasks.flatMap(getSubTasks)];
  };

  const allTasks = getSubTasks(toggleTaskId);
  const allExpanded = allTasks.every((subTaskId) =>
    expandedTasksId.includes(subTaskId)
  );
  const toggleExpandAll = () => {
    setExpandedTaskAtom((expandedTasks) => {
      const shouldExpand = expandedTasks.includes(toggleTaskId);
      if (shouldExpand) {
        return Array.from(new Set([...expandedTasks, ...allTasks]));
      }
      return expandedTasks.filter(
        (expandedTaskId) => !allTasks.includes(expandedTaskId)
      );
    });
  };

  return {
    allExpanded,
    toggleExpandAll,
  };
};
