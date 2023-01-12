import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { ReactFlowProvider } from "reactflow";
import { VscClose } from "react-icons/vsc";

import TaskStateMachineRepository from "../../../repositories/TaskStateMachineRepository";
import Dropdown from "../../Input/Dropdown";
import { TaskStateMachineState } from "../../../entities/Task";
import Button, { ButtonTheme } from "../../Input/Button";
import TaskStateMachineDiagram from "../../TaskStateMachineDiagram";
import useTaskStateDiagramProps from "./useTaskStateDiagramProps";

type Props = {
  updateTaskDetails: (
    newTaskMachineState: TaskStateMachineState | undefined
  ) => void;
  state?: TaskStateMachineState;
  initialStateMachine: TaskStateMachineState | undefined;
};

export default function TaskStateMachinePicker({
  updateTaskDetails,
  state,
  initialStateMachine,
}: Props) {
  const availableStateMachines = useLiveQuery(() =>
    TaskStateMachineRepository.getAll()
  );
  const selectedTaskStateMachine = state?.stateMachineId
    ? availableStateMachines?.find(
      (machine) => machine.id === state.stateMachineId
    )
    : undefined;

  const { selectableStates, onSelectState } = useTaskStateDiagramProps({ state, selectedTaskStateMachine, updateTaskDetails, initialStateMachine });

  if (!availableStateMachines?.length) return null;

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

  return (
    <div className="col-span-full items-end grid grid-cols-6 gap-2">
      <Dropdown
        label="Using state machine"
        className="col-span-3"
        options={dropdownOptions}
        onSelect={selectNewStateMachine}
        value={selectedTaskStateMachine?.id ?? ""}
      />
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
              currentStateId={state?.stateId}
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
