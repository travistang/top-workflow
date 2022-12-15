import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import classNames from 'classnames';
import React from 'react';
import { getSortedTaskItems, PARENT_DROP_ID } from '../../domain/DragAndDrop';
import useTaskManager from '../../domain/TaskManager';
import Todo from '../Todo';

export default function TaskList() {
  const taskManager = useTaskManager();
  const tasks = taskManager.getAllParentTasks();
  const { setNodeRef, isOver } = useDroppable({ id: PARENT_DROP_ID });
  return (
    <SortableContext items={getSortedTaskItems(tasks)}>
      <div ref={setNodeRef} className={classNames(
        "rounded-lg flex flex-col items-stretch",
        isOver ? 'bg-secondary bg-opacity-20' : 'bg-background',
      )}>
        {tasks.map((task) => (
          <Todo key={task.id} task={task} />
        ))}
      </div>
    </SortableContext>
  );
}