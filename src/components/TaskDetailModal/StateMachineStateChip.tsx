import React from 'react';
import { TaskDTO } from '../../entities/Task';
import { useTaskStateMachineOfTask } from '../../domain/TaskStateMachine';
import { TaskStateColorMapping } from '../../domain/TaskState';
import classNames from 'classnames';

type Props = {
  task: TaskDTO;
}
export default function StateMachineStateChip({ task }: Props) {
  const { taskStateMachine, currentState } = useTaskStateMachineOfTask(task);
  if (!taskStateMachine || !currentState) return null;


  const { icon, background } = TaskStateColorMapping[currentState.impliedState];

  return (
    <div className={classNames("flex items-center justify-center px-2 rounded-lg gap-2 h-8", background)}>
      {icon}
      <span className="capitalize">
        {currentState.name}
      </span>
    </div>
  )
}