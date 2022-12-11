import React from "react";
import classNames from "classnames";
import { format } from "date-fns";
import { useRecoilState, useSetRecoilState } from "recoil";
import { expandedTaskAtom, useToggleExpandAll } from "../../atoms/expandedTask";
import useTaskManager from "../../domain/TaskManager";
import { TaskDTO, TaskState } from "../../entities/Task";
import Checkbox from "../Input/Checkbox";
import { taskDetailModalAtom } from "../../atoms/taskDetailModal";
import TodoActionMenu from "./TodoActionMenu";
import { VscWarning } from "react-icons/vsc";
import DueDateText from "./DueDateText";

type Props = {
  task: TaskDTO;
  className?: string;
  onRequestCreateSubTask?: () => void;
};
export default function TodoItem({
  task,
  onRequestCreateSubTask,
  className,
}: Props) {
  const taskManager = useTaskManager();
  const { allExpanded, toggleExpandAll } = useToggleExpandAll(task.id);
  const [expandedTodoIds, setExpandedTodoId] = useRecoilState(expandedTaskAtom);
  const setTaskDetail = useSetRecoilState(taskDetailModalAtom);
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
      <Checkbox
        checked={task.state === TaskState.Completed}
        onCheck={toggleCompleted}
      />

      <div className="flex flex-col">
        <span className="bg-opacity-0">{task.name}</span>
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
