import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useRef, useState } from 'react';
import ReactFlow, { Background, ConnectionLineType, Controls } from 'reactflow';

import TaskStateMachineRepository from '../../../repositories/TaskStateMachineRepository';
import { TaskStateMachine } from '../../../entities/TaskStateMachine';
import 'reactflow/dist/style.css';
import { getTaskStateMachineView } from '../../../domain/TaskStateMachine';
import TaskStateNode from './TaskStateNode';
import useFlowViewCallback from './useFlowViewCallback';
import TaskStateMachineViewContextProvider from './TaskStateMachineViewContext';

type Props = {
  stateMachineId: string | null;
  editable?: boolean;
};

const nodeTypes = {
  taskState: TaskStateNode,
};

export default function TaskStateMachineView({ stateMachineId, editable }: Props) {
  const viewWrapper = useRef<HTMLDivElement | null>(null);
  const stateMachine = useLiveQuery(() => stateMachineId ? TaskStateMachineRepository.get(stateMachineId) : undefined, [stateMachineId]);
  const [draftStateMachine, setDraftStateMachine] = useState<TaskStateMachine | null>(null);
  const { onClick, onConnect, onNodesChange } = useFlowViewCallback(
    [draftStateMachine, setDraftStateMachine],
    viewWrapper,
    !!editable
  );
  useEffect(() => {
    if (stateMachine) {
      setDraftStateMachine(stateMachine);
    }
  }, [stateMachine]);

  if (!draftStateMachine) return null;

  const { nodes, edges } = getTaskStateMachineView(
    draftStateMachine,
    editable
  );

  return (
    <TaskStateMachineViewContextProvider
      stateMachine={draftStateMachine}
      updateStateMachine={setDraftStateMachine}>
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
    </TaskStateMachineViewContextProvider>
  );
}