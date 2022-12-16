import React from "react";
import { DndContext } from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { useDragEndHandler } from "../domain/DragAndDrop";
import TaskList from "../components/TaskList";

export default function TodoListPage() {
  const onDragEnd = useDragEndHandler();
  return (
    <DndContext modifiers={[restrictToVerticalAxis, restrictToWindowEdges]} onDragEnd={onDragEnd}>
      <TaskList />
    </DndContext>
  );
}
