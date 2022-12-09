import classNames from "classnames";
import React from "react";
import { useRecoilValue } from "recoil";
import Todo from "..";
import { expandedTaskAtom } from "../../../atoms/expandedTask";
import useTaskManager from "../../../domain/TaskManager";
import { TaskDTO } from "../../../entities/Task";
import CreateTaskPanel from "../../CreateTaskPanel";

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
  const expandedTodoId = useRecoilValue(expandedTaskAtom);
  const onAddNewTask = async (subTaskName: string) => {
    await taskManager.createTask(subTaskName, task.id);
  };
  return (
    <div
      data-component="todo-expanded-panel"
      className={classNames(
        "w-full rounded-lg flex flex-col items-stretch ml-6 bg-secondary bg-opacity-5",
        className
      )}
    >
      {taskManager.getAllSubTasks(task).map((subTask) => (
        <div className="flex flex-row flex-shrink-0 p-2 bg-opacity-10">
          <Todo
            depth={depth + 1}
            task={subTask}
            key={subTask.id}
            className={classNames("bg-opacity-10")}
          />
        </div>
      ))}
      {expandedTodoId === task.id && (
        <>
          <CreateTaskPanel className="h-12 w-full" onAddTask={onAddNewTask} />
        </>
      )}
    </div>
  );
}
