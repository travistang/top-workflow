import classNames from "classnames";
import React from "react";
import { VscTrash } from "react-icons/vsc";
import { Position } from "reactflow";
import { TaskStateColorMapping } from "../../../domain/TaskState";
import { TaskStateNodeData } from "../../../domain/TaskStateMachine/View";

import Button from "../../Input/Button";
import TextInput from "../../Input/TextInput";
import useTaskStateMutation from "../../TaskStateMachineViewEditPanel/TaskStateMachineView/useTaskStateMutation";
import { StateCycle, StateHighlightStyleMapping } from "./constants";
import TaskStateHandle from "./TaskStateHandle";

type Props = {
  connectable?: boolean;
  data: TaskStateNodeData;
};

export default function TaskStateNode({ data, connectable }: Props) {
  const { highlightType, editable, impliedState, onSelect, stateMachine, updateStateMachine } =
    data;
  const { updateNode, deleteNode } = useTaskStateMutation(
    data.id,
    stateMachine,
    updateStateMachine
  );

  const { icon, background } = TaskStateColorMapping[data.impliedState];

  const onSwitchImpliedState = () => {
    const currentIndex = StateCycle.findIndex(
      (state) => state === impliedState
    );
    const newImpliedState = StateCycle[(currentIndex + 1) % StateCycle.length];
    updateNode({ impliedState: newImpliedState });
  };

  const onDeleteNode = () => deleteNode(data.id);
  const onChangeName = (name: string) => updateNode({ name });
  return (
    <>
      <TaskStateHandle
        editing={connectable}
        id={data.id}
        type="source"
        position={Position.Bottom}
      />
      <TaskStateHandle
        editing={connectable}
        id={data.id}
        type="target"
        position={Position.Top}
      />
      <div
        onClick={onSelect}
        className={classNames(
          "grid grid-cols-6 rounded-lg bg-opacity-50 p-2 text-sm gap-y-2",
          StateHighlightStyleMapping[highlightType],
          background
        )}
      >
        <span className="col-span-full">
          {editable ? (
            <TextInput
              inputClassName="w-full"
              value={data.name}
              onChange={onChangeName}
            />
          ) : (
            data.name
          )}
        </span>
        {editable && (
          <>
            <Button onClick={onDeleteNode} className="col-start-1">
              <VscTrash />
            </Button>
            <Button onClick={onSwitchImpliedState} className="col-start-6">
              {icon}
            </Button>
          </>
        )}
      </div>
    </>
  );
}
