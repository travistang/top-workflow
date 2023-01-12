import { getReachableNextState } from "../../../domain/TaskStateMachine";
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
export default function useTaskStateDiagramProps({
  initialStateMachine,
  selectedTaskStateMachine,
  state,
  updateTaskDetails,
}: Params) {
  const selectableStates =
    selectedTaskStateMachine && initialStateMachine?.stateId
      ? getReachableNextState(
          selectedTaskStateMachine,
          initialStateMachine.stateId,
          true
        ).map((state) => state.id)
      : undefined;

  const onSelectState = (stateId: string) => {
    if (!selectedTaskStateMachine) return;
    if (selectableStates && !selectableStates.includes(stateId)) return;
    updateTaskDetails({ stateId, stateMachineId: selectedTaskStateMachine?.id });
  };

  return {
    selectableStates,
    onSelectState,
  };
}
