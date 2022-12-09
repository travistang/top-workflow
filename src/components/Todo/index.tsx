import React from "react";
import { TaskDTO } from "../../entities/Task";
import TodoExpandedPanel from "./TodoExpandedPanel";
import { useRecoilState } from "recoil";
import { expandedTaskAtom } from "../../atoms/expandedTask";
import TodoItem from "./TodoItem";
import classNames from "classnames";

type Props = {
  task: TaskDTO;
  depth?: number;
  className?: string;
};
export default function Todo({ task, className, depth = 1 }: Props) {
  const [expandedTodoIds] = useRecoilState(expandedTaskAtom);
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
        task={task}
        className="sticky left-0 bg-opacity-10 h-10 min-w-[100%]"
      />
      {expanded && <TodoExpandedPanel depth={depth} task={task} />}
    </div>
  );
}
