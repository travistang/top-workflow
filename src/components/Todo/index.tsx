import React, { useState } from "react";
import { TaskDTO, TaskState } from "../../entities/Task";
import TodoExpandedPanel from "./TodoExpandedPanel";
import { useRecoilState } from "recoil";
import { expandedTaskAtom, useExpandTask } from "../../atoms/expandedTask";
import TodoItem from "./TodoItem";
import classNames from "classnames";
import CreateTaskPanel from "../CreateTaskPanel";
import useTaskManager from "../../domain/TaskManager";
import { TaskStateColorMapping } from "../../domain/TaskState";

type Props = {
  task: TaskDTO;
  depth?: number;
  className?: string;
};
export default function Todo({ task, className, depth = 1 }: Props) {
  const [expandedTodoIds] = useRecoilState(expandedTaskAtom);
  const toggleExpand = useExpandTask(task.id);
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
        "px-2 flex flex-col items-stretch min-w-[50vw] my-1",
        className
      )}
    >
      <TodoItem
        expanded={expanded}
        onToggleExpand={toggleExpand}
        onRequestCreateSubTask={() => setCreatingSubTask(true)}
        task={task}
        isSubTask={depth > 1}
        className={classNames(
          "rounded-lg sticky left-0 h-8 min-w-[100%] bg-opacity-70",
          TaskStateColorMapping[task.state].background,

        )}
      />
      {expanded && <TodoExpandedPanel depth={depth} task={task} />}
      {creatingSubTask && (
        <CreateTaskPanel
          opened
          inputClassName="flex-1"
          onAddTask={onAddNewTask}
          onClose={() => setCreatingSubTask(false)} />
      )}
    </div>
  );
}
