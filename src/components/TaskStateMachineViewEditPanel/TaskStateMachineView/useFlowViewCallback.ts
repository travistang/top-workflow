import React, { useContext } from "react";
import {
  Connection,
  NodeChange,
  NodePositionChange,
  XYPosition,
} from "reactflow";
import {
  addTaskState,
  addTransition,
  updateTaskState,
} from "../../../domain/TaskStateMachine";
import { TaskStateMachine } from "../../../entities/TaskStateMachine";
import useFlowClickPosition from "../../../hooks/useFlowClickPosition";
import { taskStateMachineViewContext } from "./TaskStateMachineViewContext";

type FlowViewCallbackProps = [
  viewWrapper: React.MutableRefObject<HTMLDivElement | null>,
  editable: boolean
];

const updateNodePosition = (
  draftStateMachine: TaskStateMachine,
  updateStateMachine: ((stateMachine: TaskStateMachine) => void) | undefined,
  change: NodePositionChange
) => {
  if (!change.position) return;
  updateStateMachine?.(
    updateTaskState(draftStateMachine, change.id, {
      position: change.position,
    })
  );
};

export default function useFlowViewCallback(...props: FlowViewCallbackProps) {
  const { stateMachine: draftStateMachine, updateStateMachine } = useContext(
    taskStateMachineViewContext
  ) ?? {};
  const [viewWrapper, editable] = props;
  const clickHandler = useFlowClickPosition(viewWrapper);

  if (!editable || !draftStateMachine || !viewWrapper.current) return {};

  const createState = (position: XYPosition) => {
    const newStateMachine = addTaskState(
      draftStateMachine,
      "New State",
      position
    );
    updateStateMachine?.(newStateMachine);
  };

  const createConnection = (connection: Connection) => {
    if (!connection.source || !connection.target) return;
    const newStateMachine = addTransition(
      draftStateMachine,
      connection.source,
      connection.target
    );
    updateStateMachine?.(newStateMachine);
  };

  const updateNode = (changes: NodeChange[]) => {
    changes.forEach((change) => {
      switch (change.type) {
        case "position":
          return updateNodePosition(draftStateMachine, updateStateMachine, change);
        case "add":
          return createState(change.item.position);
      }
    });
  };

  return {
    onConnect: createConnection,
    onNodesChange: updateNode,
    onClick: clickHandler(createState),
  };
}
