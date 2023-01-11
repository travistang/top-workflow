import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { ReactFlowProvider } from "reactflow";
import { VscClose } from "react-icons/vsc";

import TaskStateMachineRepository from "../../../repositories/TaskStateMachineRepository";
import Dropdown from "../../Input/Dropdown";
import { TaskStateMachineState } from "../../../entities/Task";
import Button, { ButtonTheme } from "../../Input/Button";
import TaskStateMachineDiagram from "../../TaskStateMachineDiagram";
import SelectedStatePreview from "./SelectedStatePreview";
import { getReachableNextState } from "../../../domain/TaskStateMachine";

type Props = {
  updateTaskDetails: (
    newTaskMachineState: TaskStateMachineState | undefined
  ) => void;
  selectedStateMachine: TaskStateMachineState | undefined;
  initialStateMachine: TaskStateMachineState | undefined;
};

export default function TaskStateMachinePicker({
  updateTaskDetails,
  selectedStateMachine,
  initialStateMachine,
}: Props) {
  const availableStateMachines = useLiveQuery(() =>
    TaskStateMachineRepository.getAll()
  );

  if (!availableStateMachines?.length) return null;

  const selectedTaskStateMachine = selectedStateMachine?.stateMachineId
    ? availableStateMachines.find(
        (machine) => machine.id === selectedStateMachine.stateMachineId
      )
    : undefined;
  const selectedTaskState = selectedTaskStateMachine?.states.find(
    (state) => state.id === selectedStateMachine?.stateId
  );
  const dropdownOptions = availableStateMachines.map((machine) => ({
    value: machine.id,
    label: machine.name,
  }));

  const selectNewStateMachine = (stateMachineId: string) => {
    updateTaskDetails({
      stateMachineId,
      stateId: "",
    });
  };

  const onSelectState = (stateId: string) => {
    if (!selectedStateMachine) return;
    updateTaskDetails({
      ...selectedStateMachine,
      stateId,
    });
  };

  const selectableStates =
    selectedTaskStateMachine && initialStateMachine?.stateId
      ? getReachableNextState(
          selectedTaskStateMachine,
          initialStateMachine.stateId,
          true
        ).map((state) => state.id)
      : undefined;

  return (
    <div className="col-span-full items-end grid grid-cols-6 gap-2">
      <Dropdown
        label="Using state machine"
        className="col-span-3"
        options={dropdownOptions}
        onSelect={selectNewStateMachine}
        value={selectedTaskStateMachine?.id ?? ""}
      />
      {selectedTaskState && (
        <SelectedStatePreview
          className="h-full col-span-2"
          state={selectedTaskState}
        />
      )}
      {selectedTaskStateMachine && (
        <>
          <Button
            theme={ButtonTheme.Danger}
            className="bg-opacity-50 h-12 col-end-7 col-span-1"
            onClick={() => updateTaskDetails(undefined)}
          >
            <VscClose />
          </Button>
          <ReactFlowProvider>
            <TaskStateMachineDiagram
              currentStateId={selectedStateMachine?.stateId}
              selectableStates={selectableStates}
              onSelectState={onSelectState}
              taskStateMachine={selectedTaskStateMachine}
              className="col-span-full h-[33vh] w-full"
            />
          </ReactFlowProvider>
        </>
      )}
    </div>
  );
}
