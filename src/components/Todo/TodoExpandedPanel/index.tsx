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
  return (
    <div
      data-component="todo-expanded-panel"
      className={classNames(
        "w-full rounded-lg flex flex-col items-stretch ml-6 bg-secondary bg-opacity-5",
        className
      )}
    >
      {taskManager.getAllSubTasks(task).map((subTask) => (
        <div
          className="flex flex-row flex-shrink-0 p-2 bg-opacity-10"
          key={subTask.id}
        >
          <Todo
            depth={depth + 1}
            task={subTask}
            key={subTask.id}
            className={classNames("bg-opacity-10")}
          />
        </div>
      ))}
    </div>
  );
}
