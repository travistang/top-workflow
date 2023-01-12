import { TaskStateColorMapping } from "../../../domain/TaskState";
import { TaskStateNodeHighlight } from "../../../domain/TaskStateMachine/View";
import { TaskState as BaseTaskState } from "../../../entities/Task";

export const StateCycle = Object.keys(TaskStateColorMapping) as BaseTaskState[];

export const StateHighlightStyleMapping: Record<TaskStateNodeHighlight, string> = {
  [TaskStateNodeHighlight.None]: '',
  [TaskStateNodeHighlight.CurrentState]: 'border-primary border-4 border-opacity-50',
  [TaskStateNodeHighlight.SelectedCurrentState]: 'border-primary border-4',
  [TaskStateNodeHighlight.ViableNextState]: 'border-secondary border-4 border-opacity-50',
  [TaskStateNodeHighlight.SelectedViableNextState]: 'border-secondary border-4',
};
