import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { TaskDTO } from '../../entities/Task';
import TaskStateMachineRepository from '../../repositories/TaskStateMachineRepository';
import { getTaskStateById } from '../../domain/TaskStateMachine';
import { TaskStateColorMapping } from '../../domain/TaskState';
import classNames from 'classnames';

type Props = {
  task: TaskDTO;
}
export default function StateMachineStateChip({ task }: Props) {
  const { stateMachine } = task;
  const stateMachineConfig = useLiveQuery(() => TaskStateMachineRepository.get(stateMachine?.stateMachineId ?? ''), [stateMachine]);

  if (!stateMachineConfig || !stateMachine?.stateId) return null;

  const currentTaskState = getTaskStateById(stateMachineConfig, stateMachine?.stateId);
  if (!currentTaskState) return null;

  const { icon, background } = TaskStateColorMapping[currentTaskState.impliedState];

  return (
    <div className={classNames("flex items-center justify-center px-2 rounded-lg gap-2 h-8", background)}>
      {icon}
      <span className="capitalize">
        {currentTaskState.name}
      </span>
    </div>
  )
}