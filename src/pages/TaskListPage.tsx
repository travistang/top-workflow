import React from "react";
import { DndContext } from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { useDragEndHandler } from "../domain/DragAndDrop";
import TaskList from "../components/TaskList";
import TodoList from "../components/TodoList";

export default function TaskListPage() {
  const onDragEnd = useDragEndHandler();
  return (
    <DndContext modifiers={[restrictToVerticalAxis, restrictToWindowEdges]} onDragEnd={onDragEnd}>
      <div className='flex gap-2 flex-1 items-stretch'>
        <TodoList className="hidden sm:flex w-1/3 rounded-xl bg-text-secondary overflow-x-auto p-4" />
        <TaskList />
      </div>
    </DndContext>
  );
}
