import React, { useState } from "react";
import { VscAdd, VscClose, VscCheck } from "react-icons/vsc";
import classNames from "classnames";
import Button from "../Input/Button";
import useTaskManager from "../../domain/TaskManager";
import { Task } from "../../entities/Task";

type Props = {
  className?: string;
};
export default function CreateTaskPanel({ className }: Props) {
  const [adding, setAdding] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const taskManager = useTaskManager();

  const addTask = () => {
    const task = Task.from({ name: newTaskName });
    taskManager.upsert(task);
    setAdding(false);
    setNewTaskName("");
  };

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
  return (
    <div className={classNames("flex items-center gap-2 p-2", className)}>
      <input
        placeholder="Something describing your new task..."
        className="outline-none focus:outline-primary placeholder:text-xs flex-1 rounded-lg border-none px-2 bg-text bg-opacity-20 h-12"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
      />
      <Button className="w-12" onClick={addTask}>
        <VscCheck className="text-lg text-primary" />
      </Button>
      <Button className="w-12" onClick={() => setAdding(false)}>
        <VscClose className="text-lg" />
      </Button>
    </div>
  );
}
