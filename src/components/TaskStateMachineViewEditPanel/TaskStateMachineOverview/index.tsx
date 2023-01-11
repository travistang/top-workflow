import React, { useContext } from "react";
import { VscEdit, VscRemove, VscSave, VscTrash } from "react-icons/vsc";
import TaskStateMachineRepository from "../../../repositories/TaskStateMachineRepository";
import Button, { ButtonTheme } from "../../Input/Button";
import TextInput from "../../Input/TextInput";
import { taskStateMachineViewContext } from "../TaskStateMachineView/TaskStateMachineViewContext";

type Props = {
  editing: boolean;
  onSave: () => void;
  editStateMachine: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
};
export default function TaskStateMachineOverview({
  editing,
  editStateMachine,
  onCancelEdit,
  onSave,
  onDelete,
}: Props) {
  const { stateMachine, updateStateMachine } =
    useContext(taskStateMachineViewContext) ?? {};
  if (!stateMachine || !updateStateMachine) return null;

  const onChangeName = (name: string) => {
    updateStateMachine({ ...stateMachine, name });
  };
  const saveTaskMachine = async () => {
    const { id, ...draft } = stateMachine;
    await TaskStateMachineRepository.edit(stateMachine.id, draft);
    onSave();
  };

  return (
    <div className="rounded-lg grid grid-cols-6 gap-2">
      <TextInput
        className="col-span-3"
        label="State machine name"
        value={stateMachine.name}
        onChange={onChangeName}
      />
      <Button
        className="bg-text-secondary"
        onClick={editing ? onCancelEdit : editStateMachine}
      >
        {editing ? <VscRemove /> : <VscEdit />}
        {editing ? "Cancel" : "Edit"}
      </Button>
      {editing && (
        <Button
          theme={ButtonTheme.Success}
          onClick={saveTaskMachine}
          className="bg-opacity-50"
        >
          <VscSave />
          Save
        </Button>
      )}
      <Button
        theme={ButtonTheme.Danger}
        className="bg-opacity-50"
        onClick={onDelete}
      >
        <VscTrash />
        Delete
      </Button>
    </div>
  );
}
