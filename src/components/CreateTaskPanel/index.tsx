import React, { useEffect, useRef, useState } from "react";
import { VscAdd, VscClose, VscCheck } from "react-icons/vsc";
import classNames from "classnames";
import Button from "../Input/Button";
import TextInput from "../Input/TextInput";

type Props = {
  className?: string;
  inputClassName?: string;
  onAddTask: (taskName: string) => void;
  opened?: boolean;
  onClose?: () => void;
};
export default function CreateTaskPanel({
  className,
  inputClassName,
  onClose,
  onAddTask,
  opened,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [adding, setAdding] = useState(opened ?? false);
  const [newTaskName, setNewTaskName] = useState("");

  useEffect(() => {
    if (adding) {
      inputRef.current?.focus();
    }
  }, [adding]);

  const addTask = () => {
    if (!newTaskName) return;
    onAddTask(newTaskName);
    setAdding(false);
    setNewTaskName("");
  };

  const cancel = () => {
    setAdding(false);
    onClose?.();
  }

  if (!adding) {
    return (
      <div
        onClick={() => setAdding(true)}
        className={classNames(
          "gap-2 flex items-center px-2 rounded-lg border-dashed border border-text",
          className
        )}
      >
        <VscAdd />
        Add a new task...
      </div>
    );
  }

  const handleKeyDown = (key: React.KeyboardEvent) => {
    if (key.key.toLowerCase() === 'enter') {
      addTask();
    }
  };

  return (
    <div
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
        className={inputClassName}
        placeholder="Something describing your new task..."
      />
      <Button className="w-12" onClick={addTask}>
        <VscCheck className="text-lg text-primary" />
      </Button>
      <Button className="w-12" onClick={cancel}>
        <VscClose className="text-lg" />
      </Button>
    </div>
  );
}
