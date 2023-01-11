import React, { useContext } from "react";
import { ReactFlowProvider } from "reactflow";

import { taskStateMachineViewContext } from "./TaskStateMachineViewContext";
import TaskStateMachineDiagram from "../../TaskStateMachineDiagram";

type Props = {
  editable?: boolean;
};

export default function TaskStateMachineView({ editable }: Props) {
  const { stateMachine, updateStateMachine } =
    useContext(taskStateMachineViewContext) ?? {};
  if (!stateMachine || !updateStateMachine) return null;

  return (
    <ReactFlowProvider>
      <TaskStateMachineDiagram
        onUpdateStateMachine={updateStateMachine}
        taskStateMachine={stateMachine}
        editable={editable}
      />
    </ReactFlowProvider>
  );
}
