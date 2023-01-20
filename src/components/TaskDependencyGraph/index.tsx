import React, { useRef } from 'react';
import ReactFlow, { Background, MiniMap, OnConnectEnd, OnConnectStart, useEdgesState, useNodesState, useReactFlow } from 'reactflow';
import { CachedTask } from '../../atoms/tasks';
import useTaskManager from '../../domain/TaskManager';
import useDependencyGraphOptions from './useDependencyGraphOptions';
import "reactflow/dist/style.css";
import TaskNode from './TaskNode';
import { TaskState } from '../../entities/Task';

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
  const [nodesWithState, setNodes] = useNodesState(nodes);
  const [edgesWithState, setEdges] = useEdgesState(edges);
  const { project } = useReactFlow();

  const onConnectEnd: OnConnectEnd = async (event) => {
    const targetIsPane = (event.target as HTMLDivElement)?.classList?.contains('react-flow__pane');
    if (targetIsPane) {
      // we need to remove the wrapper bounds, in order to get the correct position
      const { top, left } = reactFlowWrapper.current?.getBoundingClientRect() ?? {};
      if (left === undefined || top === undefined) return;
      const newTaskId = await taskManager.createTask({
        name: "NewTask",
        parentId: connectingNodeId.current ?? undefined,
      });
      const now = Date.now();
      setNodes([
        ...nodesWithState,
        {
          id: newTaskId,
          type: 'task',
          data: {
            id: newTaskId,
            name: "New Task",
            parentId: connectingNodeId.current ? [connectingNodeId.current] : undefined,
            description: "",
            labels: [],
            createdAt: now,
            modifiedAt: now,
            state: TaskState.Pending,
            order: 1,
            history: [{ state: TaskState.Pending, date: now }],
            focused: false,
          },
          position: project({
            x: event.clientX - left, y: event.clientY - top
          })
        }
      ]);

      setEdges((eds) => {
        if (!connectingNodeId.current) return eds;
        return eds.concat({
          id: `${connectingNodeId.current}-${newTaskId}`,
          source: connectingNodeId.current,
          target: newTaskId
        });
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
        nodes={nodesWithState}
        edges={edgesWithState}
        className={className}>
        <Background />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}