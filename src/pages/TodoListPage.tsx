import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { taskDetailModalAtom } from "../atoms/taskDetailModal";
import { CachedTask } from "../atoms/tasks";
import CreateTaskPanel from "../components/CreateTaskPanel";
import Todo from "../components/Todo";
import useTaskManager from "../domain/TaskManager";
import { TaskState } from "../entities/Task";

export default function TodoListPage() {
  const taskManager = useTaskManager();
  const [creatingTodo, setCreatingTodo] = useState(false);
  const todos = taskManager.getStemTasks();
  const setViewingTaskDetails = useSetRecoilState(taskDetailModalAtom);

  const onAddTask = (name: string) => {
    taskManager.createTask({ name });
  };

  const viewTaskDetails = (task: CachedTask) => {
    setViewingTaskDetails(task);
  };

  const toggleCompleted = (todo: CachedTask) => {
    const newState = todo.state === TaskState.Completed ? TaskState.Pending : TaskState.Completed;
    taskManager.update(todo.id, { ...todo, state: newState });
  };

  return (
    <div
      onClick={() => setCreatingTodo(true)} data-
      id="todo-list-page"
      className='flex flex-col items-stretch flex-1'
    >
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          onClick={() => viewTaskDetails(todo)}
          onToggleCompleted={() => toggleCompleted(todo)}
          todo={todo}
        />
      ))}
      {creatingTodo && <CreateTaskPanel onAddTask={onAddTask} onClose={() => setCreatingTodo(false)} />}
    </div>
  );
}