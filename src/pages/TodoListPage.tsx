import React from "react";
import { useRecoilState } from "recoil";
import { expandedTaskAtom } from "../atoms/expandedTask";
import CreateTaskPanel from "../components/CreateTaskPanel";
import Todo from "../components/Todo";
import useTaskManager from "../domain/TaskManager";

export default function TodoListPage() {
  const taskManager = useTaskManager();
  const [expandedTodoId, setExpandedTodoId] = useRecoilState(expandedTaskAtom);
  const onAddSubTask = (taskName: string) => {
    taskManager.createTask(taskName);
  };

  return (
    <div
      onClick={() => setExpandedTodoId(null)}
      className="flex flex-col items-stretch gap-2 overflow-x-visible"
    >
      {taskManager.getAllParentTasks().map((task) => (
        <Todo key={task.id} task={task} />
      ))}
      {expandedTodoId === null && (
        <CreateTaskPanel onAddTask={onAddSubTask} className="h-12" />
      )}
    </div>
  );
}
