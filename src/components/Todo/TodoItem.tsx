import React from "react";
import classNames from "classnames";
import { useRecoilState, useSetRecoilState } from "recoil";
import { expandedTaskAtom, useToggleExpandAll } from "../../atoms/expandedTask";
import { TaskDTO } from "../../entities/Task";
import { taskDetailModalAtom } from "../../atoms/taskDetailModal";
import TodoActionMenu from "./TodoActionMenu";
import DueDateText from "./DueDateText";

type Props = {
  task: TaskDTO;
  className?: string;
  isSubTask?: boolean;
  onRequestCreateSubTask?: () => void;
};
export default function TodoItem({
  task,
  onRequestCreateSubTask,
  isSubTask,
  className,
}: Props) {
  const { allExpanded, toggleExpandAll } = useToggleExpandAll(task.id);
  const [expandedTodoIds, setExpandedTodoId] = useRecoilState(expandedTaskAtom);
  const setTaskDetail = useSetRecoilState(taskDetailModalAtom);
  const expanded = expandedTodoIds.includes(task.id);

  const openDetailModal = () => {
    setTaskDetail(task);
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
      className={classNames(
        "px-2 flex items-center gap-2 z-10",
        className ?? ""
      )}
    >
      <div className="flex flex-col">
        <span className={classNames("bg-opacity-0", isSubTask && 'text-sm')}>{task.name}</span>
        {task.dueDate && <DueDateText dueDate={task.dueDate} />}
      </div>
      <TodoActionMenu
        taskId={task.id}
        onRequestCreateSubTask={onRequestCreateSubTask}
        onEditDetails={openDetailModal}
        expanded={expanded}
        allExpanded={allExpanded}
        onToggleAllExpand={toggleExpandAll}
        onToggleExpand={toggleExpanded}
      />
    </div>
  );
}
