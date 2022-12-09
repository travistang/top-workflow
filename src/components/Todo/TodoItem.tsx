import classNames from "classnames";
import React from "react";
import { useRecoilState } from "recoil";
import { VscFoldUp, VscFoldDown } from "react-icons/vsc";
import { expandedTaskAtom } from "../../atoms/expandedTask";
import useTaskManager from "../../domain/TaskManager";
import { TaskDTO, TaskState } from "../../entities/Task";
import Checkbox from "../Input/Checkbox";
import Button from "../Input/Button";

type Props = {
  task: TaskDTO;
  className?: string;
};
export default function TodoItem({ task, className }: Props) {
  const taskManager = useTaskManager();
  const [expandedTodoIds, setExpandedTodoId] = useRecoilState(expandedTaskAtom);
  const expanded = expandedTodoIds.includes(task.id);

  const toggleCompleted = () => {
    taskManager.update(task.id, {
      ...task,
      state:
        task.state === TaskState.Completed
          ? TaskState.Pending
          : TaskState.Completed,
    });
  };
  const toggleExpanded = () => {
    if (!expanded) {
      setExpandedTodoId([...expandedTodoIds, task.id]);
      return;
    }
    setExpandedTodoId(expandedTodoIds.filter((id) => id !== task.id));
  };
  return (
    <div
      className={classNames("px-2 flex items-center gap-2", className ?? "")}
    >
      <Checkbox
        checked={task.state === TaskState.Completed}
        onCheck={toggleCompleted}
      />
      <span className="bg-opacity-0">{task.name}</span>
      <Button className="w-8" onClick={toggleExpanded}>
        {expanded ? <VscFoldUp /> : <VscFoldDown />}
      </Button>
    </div>
  );
}
