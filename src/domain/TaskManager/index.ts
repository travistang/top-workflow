import { useRecoilState } from "recoil";
import taskAtom from "../../atoms/tasks";
import { TaskDTO } from "../../entities/Task";
import TaskRepository from "../../repositories/TaskRepository";

export default function useTaskManager() {
  const [tasks, setTasks] = useRecoilState(taskAtom);
  const allTasks = Object.values(tasks);
  const createTask = async (name: string, parentId?: string) => {
    const newTaskDto = await TaskRepository.createTaskByName(name, parentId);
    setTasks({
      ...tasks,
      [newTaskDto.id]: newTaskDto,
    });
  };

  const getAllSubTasks = (task: TaskDTO) => {
    return allTasks.filter((maybeSubTask) => task.id === maybeSubTask.parentId);
  };

  const getTasksUnderTask = (task: TaskDTO) => {
    const directSubTasks = getAllSubTasks(task);
    return [
      ...directSubTasks,
      ...directSubTasks.flatMap((subTask) => getAllSubTasks(subTask)),
    ];
  };

  const upsert = async (...newTasks: TaskDTO[]) => {
    const newTasksList = Object.fromEntries(
      newTasks.map((task) => [task.id, task])
    );
    await Promise.all(newTasks.map((task) => TaskRepository.upsert(task)));
    setTasks({ ...tasks, ...newTasksList });
  };

  const getAllParentTasks = () => allTasks.filter((task) => !task.parentId);
  const update = async (id: string, updatedTask: TaskDTO) => {
    await TaskRepository.update(id, updatedTask);
    setTasks({ ...tasks, [id]: updatedTask });
  };

  return {
    tasks,
    createTask,
    upsert,
    getAllParentTasks,
    update,
    getAllSubTasks,
    getTasksUnderTask,
  };
}
