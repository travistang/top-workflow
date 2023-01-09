import React from "react";
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

type FlowViewCallbackProps<T extends TaskStateMachine | null = TaskStateMachine | null> = [
  draftStateMachineState: [T, React.Dispatch<T>],
  viewWrapper: React.MutableRefObject<HTMLDivElement | null>,
  editable: boolean
];

const updateNodePosition = (
  props: FlowViewCallbackProps<TaskStateMachine>,
  change: NodePositionChange
) => {
  const [[draftStateMachine, updateStateMachine]] = props;
  if (!change.position) return;
  updateStateMachine(
    updateTaskState(draftStateMachine, change.id, {
      position: change.position,
    })
  );
};

export default function useFlowViewCallback(...props: FlowViewCallbackProps) {
  const [[draftStateMachine, updateStateMachine], viewWrapper, editable] = props;
  const clickHandler = useFlowClickPosition(viewWrapper);

  if (!editable || !draftStateMachine || !viewWrapper.current) return {};

  const createState = (position: XYPosition) => {
    console.log("creating state");
    const newStateMachine = addTaskState(
      draftStateMachine,
      "New State",
      position
    );
    updateStateMachine(newStateMachine);
  };

  const createConnection = (connection: Connection) => {
    if (!connection.source || !connection.target) return;
    const newStateMachine = addTransition(
      draftStateMachine,
      connection.source,
      connection.target
    );
    updateStateMachine(newStateMachine);
  };

  const updateNode = (changes: NodeChange[]) => {
    changes.forEach((change) => {
      switch (change.type) {
        case "position":
          return updateNodePosition(
            props as FlowViewCallbackProps<TaskStateMachine>,
            change
          );
        case "add":
          console.log("Create state");
          return createState(change.item.position)
      }
    });
  };

  return {
    onConnect: createConnection,
    onNodesChange: updateNode,
    onClick: clickHandler(createState),
  };
}
