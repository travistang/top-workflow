import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import classNames from 'classnames';
import React, { useState } from 'react';
import { getSortedTaskItems, PARENT_DROP_ID } from '../../domain/DragAndDrop';
import useTaskManager from '../../domain/TaskManager';
import CreateTaskPanel from '../CreateTaskPanel';
import Todo from '../Todo';


export default function TaskList() {
  const [creatingTask, setCreatingTask] = useState(false);
  const taskManager = useTaskManager();
  const tasks = taskManager.getAllParentTasks();
  const { setNodeRef, isOver } = useDroppable({ id: PARENT_DROP_ID });
  const onAddTask = (taskName: string) => {
    taskManager.createTask(taskName);
  };

  return (
    <div data-id="TaskList" onClick={() => setCreatingTask(true)} className="flex flex-col items-stretch flex-1">
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
      {creatingTask && (
        <CreateTaskPanel
          onClose={() => setCreatingTask(false)}
          onAddTask={onAddTask}
          className="h-12 sticky bottom-0 left-0 bg-background"
        />
      )}
    </div>
  );
}