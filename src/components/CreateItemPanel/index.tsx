import React, { useEffect, useRef, useState } from "react";
import { VscClose, VscCheck } from "react-icons/vsc";
import classNames from "classnames";
import Button from "../Input/Button";
import TextInput from "../Input/TextInput";

type Props = {
  className?: string;
  inputClassName?: string;
  onConfirm: (taskName: string) => void;
  onClose?: () => void;
  placeholder?: string;
};
export default function CreateItemPanel({
  className,
  inputClassName,
  onClose,
  placeholder,
  onConfirm,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [newTaskName, setNewTaskName] = useState("");
  const canCreateTask = !!newTaskName;
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addTask = () => {
    if (!canCreateTask) return;
    onConfirm(newTaskName);
    setNewTaskName("");
  };

  const cancel = () => {
    onClose?.();
  };

  const handleKeyDown = (key: React.KeyboardEvent) => {
    if (key.key.toLowerCase() === 'enter') {
      addTask();
    }
  };

  return (
    <div
      onClick={e => e.stopPropagation()}
      onKeyDown={handleKeyDown}
      className={classNames(
        "flex items-center gap-2 p-2 bg-opacity-10",
        className
      )}
    >
      <TextInput
        inputRef={inputRef}
        value={newTaskName}
        onChange={setNewTaskName}
        className={classNames("flex-1", inputClassName)}
        placeholder={placeholder}
      />
      {canCreateTask && (
        <Button className="w-12" onClick={addTask}>
          <VscCheck className="text-lg text-primary" />
        </Button>
      )}
      <Button className="w-12" onClick={cancel}>
        <VscClose className="text-lg" />
      </Button>
    </div>
  );
}
