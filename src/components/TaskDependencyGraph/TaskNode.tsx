import classNames from 'classnames';
import React from 'react';
import { Handle, Position } from 'reactflow';
import { useSetRecoilState } from 'recoil';
import { taskDetailModalAtom } from '../../atoms/taskDetailModal';
import { CachedTask } from '../../atoms/tasks';
import { TaskStateColorMapping, useComputedState } from '../../domain/TaskState';
import TaskCompleteCheckbox from '../Task/TaskItem/TaskCompleteCheckbox';

type Props = {
  data: CachedTask;
}
export default function TaskNode({ data: task}: Props) {
  const setEditActionDetails = useSetRecoilState(taskDetailModalAtom);
  const computedState = useComputedState(task);
  return (
    <>
      <Handle type="source" position={Position.Top} />
      <Handle type="target" position={Position.Bottom} />
      <div
        onClick={() => setEditActionDetails(task)}
        className={classNames(
          "border border-lg border-text p-4 rounded-lg flex items-center gap-2 px-2 whitespace-nowrap",
          TaskStateColorMapping[computedState].background,
        )}>
        <TaskCompleteCheckbox task={task} className="z-20" />
        {task.name}
      </div>
    </>
  );
}