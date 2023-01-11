import { XYPosition } from "reactflow";
import { TaskState as BaseTaskState } from "../../entities/Task";
import {
  TaskState,
  TaskStateMachine,
  TaskStateTransition,
} from "../../entities/TaskStateMachine";

export const generateTaskState = (
  name: string,
  position: XYPosition
): TaskState => {
  return {
    id: window.crypto.randomUUID(),
    name,
    impliedState: BaseTaskState.Pending,
    position,
  };
};

export const generateTransition = (
  fromId: string,
  toId: string
): TaskStateTransition => ({
  fromId,
  toId,
  id: window.crypto.randomUUID(),
});

export const addTaskState = (
  stateMachine: TaskStateMachine,
  newStateName: string,
  position: XYPosition
): TaskStateMachine => {
  return {
    ...stateMachine,
    states: [...stateMachine.states, generateTaskState(newStateName, position)],
  };
};

export const updateTaskState = (
  stateMachine: TaskStateMachine,
  id: string,
  data: Partial<Omit<TaskState, "id">>
) => {
  return {
    ...stateMachine,
    states: stateMachine.states.map((state) =>
      state.id === id ? { ...state, ...data } : state
    ),
  };
};

export const addTransition = (
  stateMachine: TaskStateMachine,
  fromStateId: string,
  toStateId: string
): TaskStateMachine => {
  const hasExistingTransition = stateMachine.transitions.some(
    (transition) =>
      transition.fromId === fromStateId && transition.toId === toStateId
  );
  const hasFromState = stateMachine.states.find(
    (state) => state.id === fromStateId
  );
  const hasToState = stateMachine.states.find(
    (state) => state.id === toStateId
  );
  if (hasExistingTransition || !hasFromState || !hasToState) {
    return stateMachine;
  }

  return {
    ...stateMachine,
    transitions: [
      ...stateMachine.transitions,
      generateTransition(fromStateId, toStateId),
    ],
  };
};

export const getTaskStateById = (stateMachine: TaskStateMachine, id: string) =>
  stateMachine.states.find((state) => state.id === id);

export const getTransitionsFromState = (
  stateMachine: TaskStateMachine,
  id: string
) => stateMachine.transitions.filter((transition) => transition.fromId === id);

export const getReachableNextState = (
  stateMachine: TaskStateMachine,
  currentStateId: string,
  includeCurrentState = false
): TaskState[] => {
  const currentState = getTaskStateById(stateMachine, currentStateId);
  if (!currentState) return stateMachine.states;

  const reachableNextStates = getTransitionsFromState(
    stateMachine,
    currentStateId
  ).map((transition) => transition.toId);

  const nonEmptyNextStates = reachableNextStates
    .map((nextStateId) => getTaskStateById(stateMachine, nextStateId))
    .filter((result) => !!result) as TaskState[];

  return includeCurrentState
    ? [...nonEmptyNextStates, currentState]
    : nonEmptyNextStates;
};
