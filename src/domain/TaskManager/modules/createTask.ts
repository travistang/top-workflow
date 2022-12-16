import { mapToCachedTask } from "../../../atoms/tasks";
import TaskRepository from "../../../repositories/TaskRepository";
import { TaskManagerHandler, TaskManagerHandlerProps } from "../types";

const createTask: TaskManagerHandler<{ name: string, parentId?: string; }> = (props: TaskManagerHandlerProps) => async ({ name, parentId }) => {
  const newTaskDto = await TaskRepository.createTaskByName(name, parentId);
  props.setTasks({
    ...props.tasks,
    [newTaskDto.id]: mapToCachedTask(newTaskDto),
  });
};

export default createTask;