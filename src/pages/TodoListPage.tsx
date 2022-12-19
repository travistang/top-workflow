import { useSetRecoilState } from "recoil";
import { taskDetailModalAtom } from "../atoms/taskDetailModal";
import { CachedTask } from "../atoms/tasks";
import Todo from "../components/Todo";
import useTaskManager from "../domain/TaskManager";
import { TaskState } from "../entities/Task";

export default function TodoListPage() {
  const taskManager = useTaskManager();
  const todos = taskManager.getStemTasks();
  const setViewingTaskDetails = useSetRecoilState(taskDetailModalAtom);

  const viewTaskDetails = (task: CachedTask) => {
    setViewingTaskDetails(task);
  }

  const toggleCompleted = (todo: CachedTask) => {
    const newState = todo.state === TaskState.Completed ? TaskState.Pending : TaskState.Completed;
    taskManager.update(todo.id, { ...todo, state: newState });
  }

  return (
    <div className='flex flex-col items-stretch'>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          onClick={() => viewTaskDetails(todo)}
          onToggleCompleted={() => toggleCompleted(todo)}
          todo={todo}
        />
      ))}
    </div>
  )
}