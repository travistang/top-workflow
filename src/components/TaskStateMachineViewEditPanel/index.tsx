import React, { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import TaskStateMachineOverview from './TaskStateMachineOverview';
import TaskStateMachineRepository from '../../repositories/TaskStateMachineRepository';
import { TaskStateMachine } from '../../entities/TaskStateMachine';
import LoadingSpinner from '../LoadingSpinner';
import TaskStateMachineView from './TaskStateMachineView';
import TaskStateMachineViewContextProvider from './TaskStateMachineView/TaskStateMachineViewContext';

type Props = {
  selectedId?: string;
  onRemove: () => void;
};
export default function TaskStateMachineViewEditPanel({ selectedId, onRemove }: Props) {
  const stateMachine = useLiveQuery(() =>
    selectedId ? TaskStateMachineRepository.get(selectedId) : undefined, [selectedId]
  );
  const [draftStateMachine, setDraftStateMachine] = useState<TaskStateMachine | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (stateMachine) setDraftStateMachine(stateMachine);
  }, [stateMachine]);
  if (!stateMachine || !selectedId) return null;

  const nonNullDraftStateMachine = draftStateMachine as TaskStateMachine;
  const loading = selectedId && !draftStateMachine;
  const onCancelEdit = () => {
    setDraftStateMachine(stateMachine);
    setEditing(false);
  }

  const onSave = async () => {
    if (!draftStateMachine) return;
    await TaskStateMachineRepository.edit(stateMachine.id, draftStateMachine);
    setEditing(false);
  }

  return (
    <TaskStateMachineViewContextProvider
      stateMachine={nonNullDraftStateMachine}
      updateStateMachine={setDraftStateMachine}>
      <div className="flex flex-col flex-1 gap-2 items-stretch">
        {loading && <LoadingSpinner />}
        {draftStateMachine && (
          <>
            <TaskStateMachineOverview
              editing={editing}
              editStateMachine={() => setEditing(true)}
              onDelete={onRemove}
              onSave={onSave}
              onCancelEdit={onCancelEdit}
            />
            <TaskStateMachineView editable={editing} />
          </>
        )}
      </div>
    </TaskStateMachineViewContextProvider>
  );
}