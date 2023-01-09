import React from 'react';
import { VscEdit, VscRemove, VscTrash } from 'react-icons/vsc';
import { TaskStateMachine } from '../../../entities/TaskStateMachine';
import Button from '../../Input/Button';
import TextInput from '../../Input/TextInput';

type Props = {
  stateMachine: TaskStateMachine;
  updateStateMachine: (stateMachine: Omit<Partial<TaskStateMachine>, "id">) => void;
  editing: boolean;
  setEditing: (editing: boolean) => void;
  onDelete: () => void;
};
export default function TaskStateMachineOverview({
  stateMachine,
  updateStateMachine,
  editing,
  setEditing,
  onDelete
}: Props) {
  const onChangeName = (name: string) => {
    updateStateMachine({ name });
  };

  return (
    <div className="rounded-lg grid grid-cols-6">
      <TextInput
        className="col-span-3"
        value={stateMachine.name}
        onChange={onChangeName}
      />
      <Button
        className="bg-text-secondary col-start-5"
        onClick={() => setEditing(!editing)}>
        {editing ? <VscRemove /> : <VscEdit />}
        {editing ? 'Cancel' : 'Edit'}
      </Button>
      <Button
        className="text-danger bg-danger bg-opacity-50"
        onClick={onDelete}>
        <VscTrash />
        Delete
      </Button>
    </div>
  );
}