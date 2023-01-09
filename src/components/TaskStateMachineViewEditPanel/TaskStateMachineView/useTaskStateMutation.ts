import { useContext } from "react";
import { TaskState } from "../../../entities/TaskStateMachine";
import { taskStateMachineViewContext } from "./TaskStateMachineViewContext";

export default function useTaskStateMutation(stateId: string) {
  const { stateMachine, updateStateMachine } =
    useContext(taskStateMachineViewContext) ?? {};

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
