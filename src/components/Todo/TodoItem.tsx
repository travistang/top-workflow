import React, { useState } from "react";
import classNames from "classnames";
import { TaskDTO, TaskState } from "../../entities/Task";
import DueDateText from "./DueDateText";
import TodoActionModal from "./TodoActionModal";
import { VscAdd, VscKebabVertical } from "react-icons/vsc";
import { useRecoilValue } from "recoil";
import { subTaskAtom } from "../../atoms/tasks";
import ExpandIcon from "./ExpandIcon";
import { TaskStateColorMapping } from "../../domain/TaskState";

type Props = {
  task: TaskDTO;
  className?: string;
  isSubTask?: boolean;
  onRequestCreateSubTask?: () => void;
  expanded: boolean;
  onToggleExpand: () => void;
};
export default function TodoItem({
  task,
  onRequestCreateSubTask,
  isSubTask,
  expanded,
  onToggleExpand,
  className,
}: Props) {
  const [actionModalOpened, setActionModalOpened] = useState(false);
  const hasSubTask = useRecoilValue(subTaskAtom(task.id)).length > 0;
  const stateIcon = task.state === TaskState.Pending ? null : TaskStateColorMapping[task.state].icon;
  return (
    <div
      onClick={onToggleExpand}
      className={classNames(
        "px-2 flex items-center gap-2",
        hasSubTask && "cursor-pointer",
        actionModalOpened && "z-50",
        className ?? ""
      )}
    >
      <ExpandIcon hasSubTask={hasSubTask} expanded={expanded} />
      {stateIcon}
      <div className="flex flex-col">
        <span className={classNames("bg-opacity-0", isSubTask && 'text-sm')}>{task.name}</span>
        {task.dueDate && <DueDateText dueDate={task.dueDate} />}
      </div>
      <VscKebabVertical onClick={() => setActionModalOpened(true)} />
      <VscAdd onClick={onRequestCreateSubTask} />
      {actionModalOpened && (
        <TodoActionModal
          onRequestCreateSubTask={onRequestCreateSubTask}
          onClose={() => setActionModalOpened(false)}
          task={task}
        />
      )}
    </div>
  );
}
