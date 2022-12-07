import React from "react";
import CreateTaskPanel from "../components/CreateTaskPanel";
import Todo from "../components/Todo";
import useTaskManager from "../domain/TaskManager";

export default function TodoListPage() {
  const taskManager = useTaskManager();
  return (
    <div className="flex flex-col items-stretch">
      {taskManager.getAll().map((task) => (
        <Todo key={task.data.id} onMarkComplete={console.log} task={task} />
      ))}
      <CreateTaskPanel className="h-12" />
    </div>
  );
}
