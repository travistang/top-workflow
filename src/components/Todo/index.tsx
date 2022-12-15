import React, { useState } from "react";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { VscMove } from "react-icons/vsc";
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable";

import { TaskDTO } from "../../entities/Task";
import TodoExpandedPanel from "./TodoExpandedPanel";
import { expandedTaskAtom, useExpandTask } from "../../atoms/expandedTask";
import TodoItem from "./TodoItem";
import CreateTaskPanel from "../CreateTaskPanel";
import useTaskManager from "../../domain/TaskManager";
import { TaskStateColorMapping } from "../../domain/TaskState";

type Props = {
  task: TaskDTO;
  depth?: number;
  className?: string;
};
export default function Todo({ task, className, depth = 1 }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id: task.id });
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
        "px-2 flex flex-col items-stretch min-w-[50vw] my-1 sticky top-0",
        className
      )}
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
    >
      <TodoItem
        expanded={expanded}
        onToggleExpand={toggleExpand}
        onRequestCreateSubTask={() => setCreatingSubTask(true)}
        task={task}
        isSubTask={depth > 1}
        className={classNames(
          "rounded-lg sticky top-0 left-0 h-8 min-w-[50vw]",
          TaskStateColorMapping[task.state].background,

        )}
      >
        <VscMove
          {...listeners}
          {...attributes}
        />
      </TodoItem>
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
