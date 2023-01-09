import React, { useState } from 'react';
import { TaskStateMachine } from '../../entities/TaskStateMachine';
import TaskStateMachineRepository from '../../repositories/TaskStateMachineRepository';
import CreateItemPanel from '../CreateItemPanel';
import TaskStateMachineItem from './TaskStateMachineItem';

type Props = {
  stateMachines: TaskStateMachine[] | undefined;
  selectedStateMachineId?: string;
  onSelect: (selectStateMachineId: string | undefined) => void;
};
export default function TaskStateMachineList({
  onSelect,
  stateMachines,
  selectedStateMachineId
}: Props) {
  const [isCreatingStateMachine, setIsCreatingStateMachine] = useState(false);

  const addNewStateMachine = async (newStateMachineName: string) => {
    if (!newStateMachineName) return;
    await TaskStateMachineRepository.add({ name: newStateMachineName, transitions: [], states: [] });
    setIsCreatingStateMachine(false);
  };

  if (!stateMachines) return null;
  return (
    <div onClick={() => setIsCreatingStateMachine(true)} className="min-h-1/2 rounded-lg flex flex-col py-4 bg-text-secondary max-w-1/3">
      {!stateMachines.length && (<span className="text-sm flex items-center justify-center">
        No task state machines defined
      </span>)}
      {stateMachines.map(stateMachine => (
        <TaskStateMachineItem
          key={stateMachine.id}
          stateMachine={stateMachine}
          selected={selectedStateMachineId === stateMachine.id}
          onCancel={() => onSelect(undefined)}
          onSelect={() => onSelect(stateMachine.id)}
        />
      ))}
      {isCreatingStateMachine && (
        <CreateItemPanel
          onConfirm={addNewStateMachine}
          placeholder="Name of new new task state machine..."
          onClose={() => setIsCreatingStateMachine(false)}
        />
      )}
    </div>
  );
};