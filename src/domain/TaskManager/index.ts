import { useRecoilState } from "recoil";
import taskAtom from "../../atoms/tasks";
import { TaskDTO, TaskState } from "../../entities/Task";
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

  const get = (id: string) => {
    return tasks[id];
  }

  const getAllSubTasks = (task: TaskDTO) => {
    return allTasks.filter((maybeSubTask) => task.id === maybeSubTask.parentId);
  };

  const getAllSiblings = (task: TaskDTO) => {
    return allTasks.filter(
      (maybeSiblings) => task.parentId === maybeSiblings.parentId
    );
  };

  const upsert = async (...newTasks: TaskDTO[]) => {
    const newTasksList = Object.fromEntries(
      newTasks.map((task) => [task.id, task])
    );
    await Promise.all(newTasks.map((task) => TaskRepository.upsert(task)));
    setTasks({ ...tasks, ...newTasksList });
  };

  const getDerivedState = (task: TaskDTO): TaskState | null => {
    const subTasks = getAllSubTasks(task);
    if (task.state !== TaskState.Pending || subTasks.length === 0) return null;
    if (subTasks.some(task => task.state === TaskState.Blocked)) {
      return TaskState.Blocked;
    }

    if (subTasks.every(task => task.state === TaskState.Completed)) {
      return TaskState.Completed;
    };
    return null;
  }

  const getAllParentTasks = () => allTasks.filter((task) => !task.parentId);
  const update = async (id: string, updatedTask: TaskDTO) => {
    await TaskRepository.update(id, updatedTask);
    setTasks({ ...tasks, [id]: updatedTask });
  };

  const remove = async (id: string) => {
    const removedIds = await TaskRepository.remove(id);
    const remainingEntries = Object.entries(tasks).filter(([id]) => !removedIds.includes(id));
    setTasks(Object.fromEntries(remainingEntries));
  }

  return {
    get,
    tasks,
    createTask,
    upsert,
    getAllParentTasks,
    update,
    getAllSubTasks,
    getAllSiblings,
    remove,
    getDerivedState,
  };
}
