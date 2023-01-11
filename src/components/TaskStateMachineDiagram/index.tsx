import React, { useRef } from "react";
import ReactFlow, { Background, ConnectionLineType, Controls } from "reactflow";
import classNames from "classnames";

import { TaskStateMachine } from "../../entities/TaskStateMachine";
import { getTaskStateMachineView } from "../../domain/TaskStateMachine/View";
import useFlowViewCallback from "./useFlowViewCallback";
import TaskStateNode from "./TaskStateNode";

import "reactflow/dist/style.css";

type Props = {
  taskStateMachine: TaskStateMachine;
  onUpdateStateMachine?: (stateMachine: TaskStateMachine) => void;
  currentStateId?: string;
  selectableStates?: string[];
  onSelectState?: (stateId: string) => void;
  className?: string;
  editable?: boolean;
};

const nodeTypes = {
  taskState: TaskStateNode,
};

export default function TaskStateMachineDiagram({
  taskStateMachine,
  onUpdateStateMachine,
  currentStateId,
  selectableStates,
  onSelectState,
  editable,
  className,
}: Props) {
  const viewWrapper = useRef<HTMLDivElement | null>(null);
  const { onClick, onConnect, onNodesChange } = useFlowViewCallback(
    viewWrapper,
    taskStateMachine,

    onUpdateStateMachine,
    !!editable
  );

  const { nodes, edges } = getTaskStateMachineView({
    stateMachine: taskStateMachine,
    editable,
    updateStateMachine: onUpdateStateMachine,
    onSelectState,
    currentStateId,
    selectableStates,
  });

  return (
    <div
      ref={viewWrapper}
      className={classNames(
        "flex flex-1 items-center justify-center",
        className
      )}
    >
      <ReactFlow
        preventScrolling
        snapToGrid
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        onNodesChange={onNodesChange}
        onClick={onClick}
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
