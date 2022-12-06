import React from 'react';
import Todo from '../components/Todo';
import { Task, TaskState } from '../entities/Task';

export default function TodoListPage() {
  const mockTodo = new Task({
    id: '123',
    name: 'some tasks',
    description: '',
    createdAt: 123,
    modifiedAt: 123,
    state: TaskState.Pending,
    subTasksId: [],
    labels: [],
    history: [],
  })
  return (
    <div className='flex flex-col items-stretch'>
      <Todo onMarkComplete={console.log} task={mockTodo} />
    </div>
  )
}