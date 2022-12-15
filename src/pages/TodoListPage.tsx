import React from "react";
import { DndContext } from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import CreateTaskPanel from "../components/CreateTaskPanel";
import useTaskManager from "../domain/TaskManager";
import { useDragEndHandler } from "../domain/DragAndDrop";
import TaskList from "../components/TaskList";

export default function TodoListPage() {
  const taskManager = useTaskManager();
  const onDragEnd = useDragEndHandler();
  const onAddTask = (taskName: string) => {
    taskManager.createTask(taskName);
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis, restrictToWindowEdges]} onDragEnd={onDragEnd}>
      <TaskList />
      <CreateTaskPanel
        onAddTask={onAddTask}
        className="h-12 sticky bottom-0 left-0 bg-background"
      />
    </DndContext>
  );
}
