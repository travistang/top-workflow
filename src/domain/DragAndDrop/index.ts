import { DragEndEvent } from "@dnd-kit/core";
import { inRange } from "../../utils/number";
import useTaskManager from "../TaskManager";

export const PARENT_DROP_ID = "parent";
export const useDragEndHandler = () => {
  const taskManager = useTaskManager();

  return (dragEndEvent: DragEndEvent) => {
    if (!dragEndEvent.over) return;

    const fromId = dragEndEvent.active.id;
    const toId = dragEndEvent.over.id;

    const fromTask = taskManager.get(fromId as string);
    const toTask = taskManager.get(toId as string);
    if (!fromTask || !toTask) return;

    const siblings = taskManager.getAllSiblings(toTask);
    const isRankingLower = fromTask.order > toTask.order;
    const affectedOrderRange: [number, number] = isRankingLower ?  [fromTask.order, toTask.order] : [toTask.order, fromTask.order];
    const movingSiblings = siblings.filter((sibling) => inRange(affectedOrderRange, sibling.order));
    const tasksToShiftOrder = [...movingSiblings, toTask];
    const orderDelta = isRankingLower ? -1 : 1;
    const dataToUpsert = [
      ...tasksToShiftOrder.map((sib) => ({ ...sib, order: sib.order + orderDelta })),
      { ...fromTask, order: toTask.order },
    ];
    return taskManager.upsert(...dataToUpsert);
  };
};

export const getSortedTaskItems = <T extends { order?: number }>(
  items: T[]
) => [...items].sort((a, b) => (a.order ?? -1) - (b.order ?? -1));
