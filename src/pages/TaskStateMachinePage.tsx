import { useLiveQuery } from 'dexie-react-hooks';
import React, { useState } from 'react';
import TaskStateMachineList from '../components/TaskStateMachineList';
import TaskStateMachineRepository from '../repositories/TaskStateMachineRepository';

export default function TaskStateMachinePage() {
  const stateMachines = useLiveQuery(() => TaskStateMachineRepository.getAll());
  const [selectedStateMachineId, setSelectedStateMachineId] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col items-stretch">
      <TaskStateMachineList
        selectedStateMachineId={selectedStateMachineId}
        stateMachines={stateMachines ?? []}
        onSelect={setSelectedStateMachineId}
      />
    </div>
  )
}