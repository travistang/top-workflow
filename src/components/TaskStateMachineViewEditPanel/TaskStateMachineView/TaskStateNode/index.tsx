import classNames from 'classnames';
import React, { useContext } from 'react';
import { VscTrash } from 'react-icons/vsc';
import { Position } from 'reactflow';
import { TaskStateColorMapping } from '../../../../domain/TaskState';
import { TaskState } from '../../../../entities/TaskStateMachine';
import { TaskState as BaseTaskState } from '../../../../entities/Task';

import Button from '../../../Input/Button';
import { taskStateMachineViewContext } from '../TaskStateMachineViewContext';
import useTaskStateMutation from '../useTaskStateMutation';
import TaskStateHandle from './TaskStateHandle';
import TextInput from '../../../Input/TextInput';

type Props = {
  data: TaskState & {
    editable: boolean;
  };
};

const StateCycle = Object.keys(TaskStateColorMapping) as BaseTaskState[];

export default function TaskStateNode({ data }: Props) {
  const { stateMachine, updateStateMachine } = useContext(taskStateMachineViewContext) ?? {};
  const { updateNode, deleteNode } = useTaskStateMutation(data.id);
  if (!stateMachine || !updateStateMachine) return null;

  const { editable, impliedState } = data;
  const { icon, background } = TaskStateColorMapping[data.impliedState];

  const onSwitchImpliedState = () => {
    const currentIndex = StateCycle.findIndex(state => state === impliedState);
    const newImpliedState = StateCycle[(currentIndex + 1) % StateCycle.length];
    updateNode({ impliedState: newImpliedState });
  };

  const onDeleteNode = () => deleteNode(data.id);
  const onChangeName = (name: string) => updateNode({ name });
  return (
    <>
      {
        editable && (
          <>
            <TaskStateHandle id={data.id} type="source" position={Position.Bottom} />
            <TaskStateHandle id={data.id} type="target" position={Position.Top} />
          </>
        )
      }
      <div className={classNames(
        "grid grid-cols-6 rounded-lg bg-opacity-50 p-2 text-sm gap-y-2",
        background
      )}>
        <span className="col-span-full">
          {
            editable ? <TextInput inputClassName='w-full' value={data.name} onChange={onChangeName} /> : data.name
          }
        </span>
        <Button onClick={onDeleteNode} className="col-start-1">
          <VscTrash />
        </Button>
        <Button onClick={onSwitchImpliedState} className="col-start-6">
          {icon}
        </Button>
      </div>
    </>
  );
}