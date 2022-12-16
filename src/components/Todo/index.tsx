import React, { useState } from "react";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { VscMove } from "react-icons/vsc";
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from "@dnd-kit/sortable";

import { TaskState } from "../../entities/Task";
import TodoExpandedPanel from "./TodoExpandedPanel";
import { expandedTaskAtom, useExpandTask } from "../../atoms/expandedTask";
import TodoItem from "./TodoItem";
import CreateTaskPanel from "../CreateTaskPanel";
import useTaskManager from "../../domain/TaskManager";
import { TaskStateColorMapping } from "../../domain/TaskState";
import { CachedTask } from "../../atoms/tasks";

type Props = {
  task: CachedTask;
  depth?: number;
  className?: string;
};
export default function Todo({ task, className, depth = 1 }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id: task.id });
  const [expandedTodoIds] = useRecoilState(expandedTaskAtom);
  const [creatingSubTask, setCreatingSubTask] = useState(false);
  const forceExpand = useExpandTask(task.id, true);
  const taskManager = useTaskManager();
  const derivedState = taskManager.getDerivedState(task);
  const shouldHighlightWithDerviedState = derivedState && [TaskState.Completed, TaskState.Blocked].includes(derivedState);

  const onAddNewTask = async (subTaskName: string) => {
    await taskManager.createTask({name: subTaskName, parentId: task.id});
    forceExpand();
  };
  const expanded = expandedTodoIds.includes(task.id);
  return (
    <div
      data-component="todo"
      onClick={(e) => e.stopPropagation()}
      className={classNames(
        "flex flex-col items-stretch min-w-[100vw] sm:min-w-[50vw] my-1 sticky left-0",
        className
      )}
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
    >
      <TodoItem
        expanded={expanded}
        onRequestCreateSubTask={() => setCreatingSubTask(true)}
        task={task}
        isSubTask={depth > 1}
        className={classNames(
          "whitespace-nowrap rounded-lg h-8 ",
          TaskStateColorMapping[task.state].background,
          shouldHighlightWithDerviedState && classNames(TaskStateColorMapping[derivedState].background, 'rounded-lg bg-opacity-30'),
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
          inputClassName="flex-1"
          onAddTask={onAddNewTask}
          onClose={() => setCreatingSubTask(false)} />
      )}
    </div>
  );
}
