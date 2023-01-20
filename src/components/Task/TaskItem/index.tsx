import React from "react";
import classNames from "classnames";
import { TaskState } from "../../../entities/Task";
import DueDateText from "../DueDateText";
import { VscAdd, VscKebabVertical } from "react-icons/vsc";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CachedTask, subTaskAtom } from "../../../atoms/tasks";
import ExpandIcon from "../ExpandIcon";
import { TaskStateColorMapping } from "../../../domain/TaskState";
import { taskDetailModalAtom } from "../../../atoms/taskDetailModal";
import { useExpandTask } from "../../../atoms/expandedTask";
import TaskCompleteCheckbox from "./TaskCompleteCheckbox";

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
  const stateIcon = task.state === TaskState.Pending ? null : TaskStateColorMapping[task.state].icon;
  const onToggleExpand = useExpandTask(task.id);

  const toggleExpand = () => {
    if (!hasSubTask) return;
    onToggleExpand();
  }

  const requestCreateSubTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRequestCreateSubTask?.();
  }
  return (
    <div
      data-component="task-item"
      onClick={toggleExpand}
      className={classNames(
        "px-2 py-3 flex items-center gap-2 whitespace-wrap",
        hasSubTask && "cursor-pointer",
        className ?? ""
      )}
    >
      <ExpandIcon hasSubTask={hasSubTask} expanded={expanded} />
      {stateIcon}
      <TaskCompleteCheckbox task={task} />
      <div className="flex flex-col">
        <span className={classNames("bg-opacity-0", isSubTask && 'text-sm')}>{task.name}</span>
        {task.dueDate && <DueDateText dueDate={task.dueDate} />}
      </div>
      <VscKebabVertical onClick={() => setEditActionDetails(task)} />
      <VscAdd onClick={requestCreateSubTask} />
      {children}
    </div>
  );
}
