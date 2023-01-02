import axios from 'axios';
import { CachedTask } from "../../atoms/tasks";
import { isEqual } from '../../utils/changes';

export type Changes<T = CachedTask> = {
  created: T[];
  removed: T[];
  updated: { previous: T, current: T; }[];
};

const findTaskInList = (tasks: CachedTask[], id: string) =>
  tasks.find((task) => task.id === id);

export const computeChanges = (
  previousTask: CachedTask[],
  currentTask: CachedTask[]
) => {
  const createdTasks = currentTask.filter(
    (currentTask) => !findTaskInList(previousTask, currentTask.id)
  );
  const removedTasks = previousTask.filter(
    (prevTask) => !findTaskInList(currentTask, prevTask.id)
  );

  const changedTasks = currentTask
    .filter((currentTask) => {
      const prevTask = findTaskInList(previousTask, currentTask.id);
      if (!prevTask) return false;

      return !isEqual(prevTask, currentTask);
    })
    .map((editedTask) => ({
      current: editedTask,
      previous: findTaskInList(previousTask, editedTask.id) as CachedTask,
    }));

  return {
    created: createdTasks,
    removed: removedTasks,
    updated: changedTasks,
  };
};

export const applyChanges = (tasks: CachedTask[], changes: Changes) => {
  const { created, removed, updated } = changes;
  let newTasks = tasks.filter(task => !removed.find(removedTask => removedTask.id === task.id)).concat(created);
  return newTasks.map(newTask => {
    const updatedVersion = updated.find(updatedTask => updatedTask.current.id === newTask.id)?.current;
    return updatedVersion ? updatedVersion : newTask;
  });
};

export const reportChanges = async (serverUrl: string, previousTasks: CachedTask[], currentTasks: CachedTask[]) => {
  const changes = computeChanges(previousTasks, currentTasks);
  const updateResponse = await axios.post(serverUrl, changes);
  return updateResponse.data as Changes;
}