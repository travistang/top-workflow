import React, { useRef } from 'react';
import ReactFlow, { Background, MiniMap, OnConnectEnd, OnConnectStart } from 'reactflow';
import { CachedTask } from '../../atoms/tasks';
import useTaskManager from '../../domain/TaskManager';
import useDependencyGraphOptions from './useDependencyGraphOptions';
import "reactflow/dist/style.css";
import TaskNode from './TaskNode';

type Props = {
  task: CachedTask;
  className?: string;
};

export default function TaskDependencyGraph({ className, task }: Props) {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const connectingNodeId = useRef<string | null>(null);
  const taskManager = useTaskManager();
  const allDependentTasks = taskManager.getAllSubTasks(task);
  const { nodes, edges } = useDependencyGraphOptions([task, ...allDependentTasks]);

  const onConnectEnd: OnConnectEnd = async (event) => {
    const targetIsPane = (event.target as HTMLDivElement)?.classList?.contains('react-flow__pane');
    if (targetIsPane) {
      const { top, left } = reactFlowWrapper.current?.getBoundingClientRect() ?? {};
      if (left === undefined || top === undefined) return;
      await taskManager.createTask({
        name: "NewTask",
        parentId: connectingNodeId.current ?? undefined,
      });
    }
  }

  const onConnectStart: OnConnectStart = ((_, { nodeId }) => connectingNodeId.current = nodeId);
  return (
    <div className="contents" ref={reactFlowWrapper}>
      <ReactFlow
        fitView
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeTypes={{ task: TaskNode }}
        nodes={nodes}
        edges={edges}
        className={className}>
        <Background />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}