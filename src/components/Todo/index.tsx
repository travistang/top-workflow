import React from 'react';
import classNames from 'classnames';
import { CachedTask } from '../../atoms/tasks';
import Checkbox from '../Input/Checkbox';
import { TaskState } from '../../entities/Task';
import useTaskManager from '../../domain/TaskManager';

type Props = {
  todo: CachedTask;
  onClick?: () => void;
  onToggleCompleted?: () => void;
  className?: string;
};

export default function Todo({ className, todo, onClick, onToggleCompleted = () => { } }: Props) {
  const taskManager = useTaskManager();
  const parentTaskChain = taskManager.getParentTaskChain(todo);
  const parentTaskChainString = parentTaskChain.map(parent => parent.name).join(' > ');
  const clickWithStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  }
  return (
    <div
      onClick={clickWithStopPropagation}
      className={classNames(
      "cursor-pointer flex flex-row items-center flex-nowrap px-2 py-2 gap-2",
      "border-b border-text border-opacity-50 last:border-none",
      className
    )}>
      <Checkbox className="sticky left-0 bg-text-alt" checked={todo.state === TaskState.Completed} onCheck={onToggleCompleted} />
      <div className="flex flex-col">
        {parentTaskChainString && (
          <span className="text-xs text-primary text-opacity-70 overflow-hidden whitespace-nowrap text-ellipsis">
            {parentTaskChainString} {'>'}
          </span>
        )}
        <span>{todo.name}</span>
      </div>
    </div>
  );
}