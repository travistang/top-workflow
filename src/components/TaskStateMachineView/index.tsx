import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react';
import ReactFlow from 'reactflow';
import TaskRepository from '../../repositories/TaskRepository';

type Props = {
  stateMachineId: string | null;
}
export default function TaskStateMachineView({stateMachineId}: Props) {
const stateMachine = useLiveQuery(() => stateMachineId ? TaskRepository.get(stateMachineId) : undefined, [stateMachineId])
  console.log({ stateMachine });
  return (
    <div className="flex flex-1 items-center justify-center">
      <ReactFlow>

      </ReactFlow>
    </div>
  )
}