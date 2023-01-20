import classNames from 'classnames';
import React from 'react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { useRecoilState } from 'recoil';
import { CachedTask, focusedTaskSelector } from '../../atoms/tasks';
import Button from '../Input/Button';

type Props = {
  task: CachedTask;
}
export default function TaskFocusToggle({ task }: Props) {
  const [focusedTask, setFocusedTask] = useRecoilState(focusedTaskSelector);
  const isFocused = focusedTask && focusedTask.id === task.id;
  return (
    <Button
      className={classNames(
        "flex items-center gap-2 px-2 bg-secondary h-8 rounded-lg flex-shrink-0",
        !isFocused ? "bg-secondary" : "bg-text bg-opacity-20"
      )}
      onClick={() => setFocusedTask(isFocused ? null : task)}
    >
      {!isFocused ? <VscEyeClosed /> : <VscEye />}
    </Button>
  )
}