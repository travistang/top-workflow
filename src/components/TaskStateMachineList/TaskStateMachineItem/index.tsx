import classNames from 'classnames';
import React from 'react';
import { VscClose } from 'react-icons/vsc';
import { TaskStateMachine } from '../../../entities/TaskStateMachine';
import Button from '../../Input/Button';

type Props = {
  stateMachine: TaskStateMachine;
  selected: boolean;
  onSelect: () => void;
  onCancel: () => void;
}

export default function TaskStateMachineItem({
  stateMachine,
  onSelect,
  selected,
  onCancel
}: Props) {
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  }

  return (
    <div
      key={stateMachine.id}
      onClick={onClick}
      className={classNames(
        "px-2 h-8 flex items-center",
        selected && "bg-text-secondary"
      )}>
      {stateMachine.name}
      {selected && (
        <Button onClick={onCancel} className="h-4 w-4">
          <VscClose />
        </Button>
      )}
    </div>
  );
}