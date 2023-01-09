import React from "react";
import { ConnectionLineType, Edge, MarkerType, Node, XYPosition } from "reactflow";
import { TaskState as BaseTaskState } from "../../entities/Task";
import {
  TaskState,
  TaskStateMachine,
  TaskStateTransition,
} from "../../entities/TaskStateMachine";

export const generateTaskState = (name: string, position: XYPosition): TaskState => {
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
  position: XYPosition,
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
    states: stateMachine.states.map(state => state.id === id ? {...state, ...data} : state)
  }
}

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

export const getTaskStateMachineView = (
  stateMachine: TaskStateMachine,
  editable?: boolean,
): {
  nodes: Node<TaskState>[];
  edges: Edge<TaskStateTransition>[];
} => {
  const nodes = stateMachine.states.map<Node<TaskState>>((state) => ({
    id: state.id,
    data: {
      ...state,
      editable,
    },
    position: state.position,
    connectable: editable,
    type: 'taskState',
  }));

  const edges = stateMachine.transitions.map<Edge<TaskStateTransition>>((transition) => ({
    id: transition.id,
    source: transition.fromId,
    target: transition.toId,
    label: transition.name,
    type: ConnectionLineType.SmoothStep,
    markerEnd: { type: MarkerType.ArrowClosed }
  }));

  return { nodes, edges };
};
