import React from 'react';
import { VscArrowLeft } from 'react-icons/vsc';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import Button from '../components/Input/Button';
import TaskDependencyGraph from '../components/TaskDependencyGraph';
import useTaskManager from '../domain/TaskManager';

export default function TaskGraphPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const taskManager = useTaskManager();
  const task = taskManager.get(id ?? '');
  if (!task) return null;

  return (
    <ReactFlowProvider>
      <div className="grid grid-cols-6 flex-1 gap-4 grid-rows-[auto_1fr]">
        <Button onClick={() => navigate(-1)} className="h-10 gap-2 bg-text-secondary col-span-2">
          <VscArrowLeft />
          Return to previous page
        </Button>
        <TaskDependencyGraph className="col-span-full" task={task}  />
      </div>
    </ReactFlowProvider>
  )
}