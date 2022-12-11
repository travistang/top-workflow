import React, { useState } from "react";
import { TaskDTO } from "../../entities/Task";
import TodoExpandedPanel from "./TodoExpandedPanel";
import { useRecoilState } from "recoil";
import { expandedTaskAtom, useExpandTask } from "../../atoms/expandedTask";
import TodoItem from "./TodoItem";
import classNames from "classnames";
import CreateTaskPanel from "../CreateTaskPanel";
import useTaskManager from "../../domain/TaskManager";

type Props = {
  task: TaskDTO;
  depth?: number;
  className?: string;
};
export default function Todo({ task, className, depth = 1 }: Props) {
  const [expandedTodoIds] = useRecoilState(expandedTaskAtom);
  const [creatingSubTask, setCreatingSubTask] = useState(false);
  const forceExpand = useExpandTask(task.id, true);
  const taskManager = useTaskManager();
  const onAddNewTask = async (subTaskName: string) => {
    setCreatingSubTask(false);
    await taskManager.createTask(subTaskName, task.id);
    forceExpand();
  };
  const expanded = expandedTodoIds.includes(task.id);
  return (
    <div
      data-component="todo"
      onClick={(e) => e.stopPropagation()}
      className={classNames(
        "rounded-lg p-2 flex flex-col items-stretch bg-opacity-10",
        className
      )}
    >
      <TodoItem
        onRequestCreateSubTask={() => setCreatingSubTask(true)}
        task={task}
        className="sticky left-0 bg-opacity-10 h-10 min-w-[100%]"
      />
      {expanded && <TodoExpandedPanel depth={depth} task={task} />}
      {creatingSubTask && <CreateTaskPanel onAddTask={onAddNewTask} opened />}
    </div>
  );
}
