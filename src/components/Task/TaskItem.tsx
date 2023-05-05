import React from "react";
import classNames from "classnames";
import { TaskState } from "../../entities/Task";
import DueDateText from "./DueDateText";
import { VscAdd, VscKebabVertical } from "react-icons/vsc";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CachedTask, subTaskAtom } from "../../atoms/tasks";
import ExpandIcon from "./ExpandIcon";
import { TaskStateColorMapping } from "../../domain/TaskState";
import { taskDetailModalAtom } from "../../atoms/taskDetailModal";
import { useExpandTask } from "../../atoms/expandedTask";
import Checkbox from "../Input/Checkbox";
import useTaskManager from "../../domain/TaskManager";

type Props = {
  task: CachedTask;
  className?: string;
  isSubTask?: boolean;
  onRequestCreateSubTask?: () => void;
  expanded: boolean;
  children?: React.ReactNode;
};
export default function TaskItem({
  task,
  onRequestCreateSubTask,
  isSubTask,
  expanded,
  className,
  children,
}: Props) {
  const setEditActionDetails = useSetRecoilState(taskDetailModalAtom);
  const hasSubTask = useRecoilValue(subTaskAtom(task.id)).length > 0;
  const taskManager = useTaskManager();
  const stateIcon = task.state === TaskState.Pending ? null : TaskStateColorMapping[task.state].icon;
  const onToggleExpand = useExpandTask(task.id);

  const toggleExpand = () => {
    if (!hasSubTask) return;
    onToggleExpand();
  };

  const toggleCompleted = () => {
    const newState = task.state === TaskState.Completed ? TaskState.Pending : TaskState.Completed;
    taskManager.update(task.id, { ...task, state: newState });
  };

  const requestCreateSubTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRequestCreateSubTask?.();
  };
  return (
    <div
      onClick={toggleExpand}
      className={classNames(
        "px-2 py-3 flex items-center gap-2 whitespace-wrap",
        hasSubTask && "cursor-pointer",
        className ?? ""
      )}
    >
      <ExpandIcon hasSubTask={hasSubTask} expanded={expanded} />
      {stateIcon}
      <Checkbox onCheck={toggleCompleted} checked={task.state === TaskState.Completed} />
      <div className="flex flex-col">
        <span className={classNames("bg-opacity-0", isSubTask && 'text-sm')}>{task.name}</span>
        {task.dueDate && <DueDateText dueDate={task.dueDate} />}
      </div>
      <VscKebabVertical onClick={() => setEditActionDetails(task)} />
      {children}
      <div className="flex-1" />
      <VscAdd onClick={requestCreateSubTask} />
    </div>
  );
}
