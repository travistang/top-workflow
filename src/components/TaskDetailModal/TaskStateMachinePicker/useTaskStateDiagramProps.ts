import { getReachableNextState } from "../../../domain/TaskStateMachine";
import { TaskStateNodeHighlight } from "../../../domain/TaskStateMachine/View";
import { TaskStateMachineState } from "../../../entities/Task";
import { TaskStateMachine } from "../../../entities/TaskStateMachine";

type Params = {
  initialStateMachine?: TaskStateMachineState;
  selectedTaskStateMachine?: TaskStateMachine;
  state?: TaskStateMachineState;
  updateTaskDetails: (
    newTaskMachineState: TaskStateMachineState | undefined
  ) => void;
};

const computeHighlightedStates = (
  params: Params
): Record<string, TaskStateNodeHighlight> => {
  const { state, initialStateMachine, selectedTaskStateMachine } = params;
  if (!selectedTaskStateMachine) return {};

  const currentStateId = initialStateMachine?.stateId;
  const selectedStateId = state?.stateId;

  if (!currentStateId) {
    const allStatesId = selectedTaskStateMachine.states.map(
      (state) => state.id
    );
    return Object.fromEntries(
      allStatesId.map((id) => [id, TaskStateNodeHighlight.ViableNextState])
    );
  }

  const highlightedStates: Record<string, TaskStateNodeHighlight> = {
    [currentStateId]:
      currentStateId === selectedStateId
        ? TaskStateNodeHighlight.SelectedCurrentState
        : TaskStateNodeHighlight.CurrentState,
  };
  const reachableStatesFromCurrentState = getReachableNextState(
    selectedTaskStateMachine,
    currentStateId
  );
  reachableStatesFromCurrentState.forEach(({ id: reachableStateId }) => {
    const isReachableStateSelected = reachableStateId === selectedStateId;
    highlightedStates[reachableStateId] = isReachableStateSelected
      ? TaskStateNodeHighlight.SelectedViableNextState
      : TaskStateNodeHighlight.ViableNextState;
  });

  return highlightedStates;
};

export default function useTaskStateDiagramProps(params: Params) {
  const { selectedTaskStateMachine, updateTaskDetails } = params;
  const highlightedStates = computeHighlightedStates(params);
  const onSelectState = (stateId: string) => {
    const isStateHighlighted = !!highlightedStates[stateId];
    if (!selectedTaskStateMachine || !isStateHighlighted) return;
    updateTaskDetails({
      stateId,
      stateMachineId: selectedTaskStateMachine?.id,
    });
  };

  return {
    onSelectState,
    highlightedStates,
  };
}
