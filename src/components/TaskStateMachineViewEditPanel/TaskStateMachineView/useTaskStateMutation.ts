import {
  TaskState,
  TaskStateMachine,
} from "../../../entities/TaskStateMachine";

export default function useTaskStateMutation(
  stateId: string,
  stateMachine: TaskStateMachine,
  updateStateMachine?: (newStateMachine: TaskStateMachine) => void
) {
  const updateNode = (newData: Partial<Omit<TaskState, "id">>) => {
    if (!stateMachine || !updateStateMachine) return;
    const states = stateMachine?.states.map((state) =>
      state.id === stateId
        ? {
            ...state,
            ...newData,
          }
        : state
    );
    updateStateMachine({
      ...stateMachine,
      states,
    });
  };

  const deleteNode = (stateId: string) => {
    if (!stateMachine || !updateStateMachine) return;
    const states = stateMachine.states.filter((state) => state.id !== stateId);
    const transitions = stateMachine.transitions.filter(
      (transition) =>
        transition.fromId !== stateId && transition.toId !== stateId
    );
    updateStateMachine({
      ...stateMachine,
      states,
      transitions,
    });
  };

  return {
    updateNode,
    deleteNode,
  };
}
