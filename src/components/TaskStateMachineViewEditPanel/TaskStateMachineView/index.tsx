import React, { useContext, useRef } from 'react';
import ReactFlow, { Background, ConnectionLineType, ConnectionMode, Controls } from 'reactflow';

import { getTaskStateMachineView } from '../../../domain/TaskStateMachine';
import TaskStateNode from './TaskStateNode';
import useFlowViewCallback from './useFlowViewCallback';
import { taskStateMachineViewContext } from './TaskStateMachineViewContext';
import 'reactflow/dist/style.css';

type Props = {
  editable?: boolean;
};

const nodeTypes = {
  taskState: TaskStateNode,
};

export default function TaskStateMachineView({ editable }: Props) {
  const { stateMachine, updateStateMachine } = useContext(taskStateMachineViewContext) ?? {};
  const viewWrapper = useRef<HTMLDivElement | null>(null);
  const { onClick, onConnect, onNodesChange } = useFlowViewCallback(
    viewWrapper, !!editable
  );

  if (!stateMachine || !updateStateMachine) return null;

  const { nodes, edges } = getTaskStateMachineView(
    stateMachine,
    editable
  );

  console.log({ nodes, edges, stateMachine });

  return (
    <div ref={viewWrapper} className="flex flex-1 items-center justify-center">
      <ReactFlow
        snapToGrid
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        onNodesChange={onNodesChange}
        onClick={onClick}
        nodes={nodes}
        onConnect={onConnect}
        edges={edges}
        nodeTypes={nodeTypes}>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}