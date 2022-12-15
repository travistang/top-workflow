import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import classNames from "classnames";
import React from "react";
import Todo from "..";
import useTaskManager from "../../../domain/TaskManager";
import { TaskDTO } from "../../../entities/Task";

type Props = {
  task: TaskDTO;
  depth?: number;
  className?: string;
};
export default function TodoExpandedPanel({
  depth = 0,
  task,
  className,
}: Props) {
  const taskManager = useTaskManager();
  const subTasks = taskManager.getAllSubTasks(task).sort((a, b) => (a.order ?? -1) - (b.order ?? -1));

  return (
    <div
      data-component="todo-expanded-panel"
      className={classNames(
        "w-full flex flex-col items-stretch ml-4 my-2",
        "border-l-2 border-text border-opacity-40",
        className
      )}
    >
      {subTasks.map((subTask) => (
        <div
          className="flex flex-row flex-shrink-0 px-2"
          key={subTask.id}
        >
          <Todo
            depth={depth + 1}
            task={subTask}
            key={subTask.id}
          />
        </div>
      ))}
    </div>
  );
}
