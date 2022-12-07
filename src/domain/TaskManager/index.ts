import { useRecoilState } from "recoil";
import taskAtom from "../../atoms/tasks";
import { Task } from "../../entities/Task";
import TaskRepository from "../../repositories/TaskRepository";

export default function useTaskManager() {
  const [tasks, setTasks] = useRecoilState(taskAtom);
  const upsert = async (...newTasks: Task[]) => {
    const newTasksList = Object.fromEntries(
      newTasks.map((task) => [task.data.id, task])
    );
    await Promise.all(newTasks.map((task) => TaskRepository.upsert(task.data)));
    setTasks({ ...tasks, ...newTasksList });
  };

  const fetchSubTasks = async (taskId: string) => {
    const task = tasks[taskId];
    if (!task) return;
    const subTasks = await task.subTasks();
    upsert(...subTasks);
  };

  const getAll = () => Object.values(tasks);

  return {
    tasks,
    fetchSubTasks,
    upsert,
    getAll,
  };
}
