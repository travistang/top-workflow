import { useLiveQuery } from 'dexie-react-hooks';
import React, { useState } from 'react';
import TaskStateMachineList from '../components/TaskStateMachineList';
import TaskStateMachineViewEditPanel from '../components/TaskStateMachineViewEditPanel';
import TaskStateMachineRepository from '../repositories/TaskStateMachineRepository';

export default function TaskStateMachinePage() {
  const stateMachines = useLiveQuery(() => TaskStateMachineRepository.getAll());
  const [selectedStateMachineId, setSelectedStateMachineId] = useState<string | undefined>(undefined);

  const removeSelectedMachine = async () => {
    if (!selectedStateMachineId) return;
    await TaskStateMachineRepository.remove(selectedStateMachineId);
    setSelectedStateMachineId(undefined);
  };

  return (
    <div className="flex-1 flex flex-col gap-2 sm:flex-row items-stretch">
      <TaskStateMachineList
        selectedStateMachineId={selectedStateMachineId}
        stateMachines={stateMachines ?? []}
        onSelect={setSelectedStateMachineId}
      />
      <TaskStateMachineViewEditPanel
        selectedId={selectedStateMachineId}
        onRemove={removeSelectedMachine}
      />
    </div>
  );
}