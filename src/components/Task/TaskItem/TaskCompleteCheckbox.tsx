import React from 'react';
import { CachedTask } from '../../../atoms/tasks';
import useTaskManager from '../../../domain/TaskManager';
import { TaskState } from '../../../entities/Task';
import Checkbox from '../../Input/Checkbox';

type Props = {
  task: CachedTask;
  className?: string;
}
export default function TaskCompleteCheckbox({ className, task }: Props) {
  const isUsingStateMachine = !!task.stateMachine;
  const { update } = useTaskManager();

  if (isUsingStateMachine) return null;
  const completed = task.state === TaskState.Completed;
  const onToggleState = () => {
    const newState = completed ? TaskState.Pending : TaskState.Completed;
    update(task.id, { ...task, state: newState });
  }

  return (
    <Checkbox checked={completed} onCheck={onToggleState} className={className} />
  )
}