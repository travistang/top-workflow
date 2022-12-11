import React from "react";
import CreateTaskPanel from "../components/CreateTaskPanel";
import Todo from "../components/Todo";
import useTaskManager from "../domain/TaskManager";

export default function TodoListPage() {
  const taskManager = useTaskManager();
  const onAddSubTask = (taskName: string) => {
    taskManager.createTask(taskName);
  };

  return (
    <div className="flex flex-col items-stretch gap-1 overflow-x-visible bg-background">
      {taskManager.getAllParentTasks().map((task) => (
        <Todo key={task.id} task={task} />
      ))}
      <CreateTaskPanel
        onAddTask={onAddSubTask}
        className="h-12 sticky bottom-0 bg-background"
      />
    </div>
  );
}
