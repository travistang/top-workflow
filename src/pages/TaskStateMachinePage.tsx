import { useLiveQuery } from 'dexie-react-hooks';
import React, { useState } from 'react';
import TaskStateMachineList from '../components/TaskStateMachineList';
import TaskStateMachineView from '../components/TaskStateMachineViewEditPanel/TaskStateMachineView';
import TaskStateMachineRepository from '../repositories/TaskStateMachineRepository';

export default function TaskStateMachinePage() {
  const stateMachines = useLiveQuery(() => TaskStateMachineRepository.getAll());
  const [selectedStateMachineId, setSelectedStateMachineId] = useState<string | undefined>(undefined);

  return (
    <div className="flex-1 flex flex-col gap-2 sm:flex-row items-stretch">
      <TaskStateMachineList
        selectedStateMachineId={selectedStateMachineId}
        stateMachines={stateMachines ?? []}
        onSelect={setSelectedStateMachineId}
      />
      <div className="flex flex-col flex-1 gap-2 items-stretch">

        <TaskStateMachineView editable stateMachineId={selectedStateMachineId ?? null} />
      </div>
    </div>
  )
}