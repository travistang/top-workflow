import classNames from 'classnames';
import React from 'react';
import { VscFoldDown } from 'react-icons/vsc';
import { Connection, Handle, Position } from 'reactflow';

type Props = {
  type: 'source' | 'target';
  position: Position;
  className?: string;
  id: string;
};

const isValidConnection = (connection: Connection) => {
  const { source, target, sourceHandle, targetHandle } = connection;
  if (source === target) return false;
  if (sourceHandle?.endsWith('target')) return false;
  if (targetHandle?.endsWith('source')) return false;
  return true;
}
export default function CustomHandle({ id, className, type, position }: Props) {
  return (
    <Handle
      type={type}
      id={`${id}-${type}`}
      isValidConnection={isValidConnection}
      className={classNames(
        "text-md flex items-center py-1 w-6 justify-center rounded-lg border-sm z-10",
        "custom-handle",
        className
      )}
      position={position}
    >
      <VscFoldDown className="text-text w-2 h-2 -z-10" />
    </Handle>
  );
}