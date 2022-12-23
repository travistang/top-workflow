import classNames from 'classnames';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { taskDetailModalAtom } from '../../atoms/taskDetailModal';
import { CachedTask } from '../../atoms/tasks';
import useTaskManager from '../../domain/TaskManager';
import { TaskState } from '../../entities/Task';
import CreateTaskPanel from '../CreateTaskPanel';
import Todo from '../Todo';

type Props = {
  className?: string;
};
export default function TodoList({ className }: Props) {
  const taskManager = useTaskManager();
  const [creatingTodo, setCreatingTodo] = useState(false);
  const todos = taskManager.getStemTasks();
  const setViewingTaskDetails = useSetRecoilState(taskDetailModalAtom);

  const onAddTask = (name: string) => {
    taskManager.createTask({ name });
  };

  const viewTaskDetails = (task: CachedTask) => {
    setViewingTaskDetails(task);
  };

  const toggleCompleted = (todo: CachedTask) => {
    const newState = todo.state === TaskState.Completed ? TaskState.Pending : TaskState.Completed;
    taskManager.update(todo.id, { ...todo, state: newState });
  };
  return (
    <div
      data-id="todo-list-page"
      onClick={() => setCreatingTodo(!creatingTodo)}
      className={classNames('flex flex-col items-stretch', className)}
    >
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          onClick={() => viewTaskDetails(todo)}
          onToggleCompleted={() => toggleCompleted(todo)}
          todo={todo}
        />
      ))}
      {creatingTodo && <CreateTaskPanel onAddTask={onAddTask} onClose={() => setCreatingTodo(false)} />}
    </div>
  );
}