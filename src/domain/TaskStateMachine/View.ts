import { ConnectionLineType, Edge, MarkerType, Node } from "reactflow";
import { getReachableNextState } from ".";
import {
  TaskState,
  TaskStateMachine,
  TaskStateTransition,
} from "../../entities/TaskStateMachine";

export type ComputeTaskStateMachineViewProps = {
  stateMachine: TaskStateMachine;
  editable?: boolean;
  updateStateMachine?: (newStateMachine: TaskStateMachine) => void;
  currentStateId?: string;
  selectedStateId?: string;
  selectableStates?: string[];
  onSelectState?: (stateId: string) => void;
};

export enum TaskStateNodeHighlight {
  None,
  CurrentState,
  SelectedCurrentState,
  ViableNextState,
  SelectedViableNextState,
}

export type TaskStateNodeData = TaskState & {
  editable?: boolean;
  stateMachine: TaskStateMachine;
  updateStateMachine?: (newMachine: TaskStateMachine) => void;
  onSelect?: () => void;
  currentStateId?: string;
  highlightType: TaskStateNodeHighlight;
};

const computeNodeHighlight = (
  stateMachine: TaskStateMachine,
  state: TaskState,
  currentStateId?: string,
  selectedStateId?: string
): TaskStateNodeHighlight => {
  if (!currentStateId) return TaskStateNodeHighlight.ViableNextState;
  const isStateCurrent = state.id === currentStateId;
  const isStateSelected = state.id === selectedStateId;
  if (isStateCurrent)
    return isStateSelected
      ? TaskStateNodeHighlight.SelectedCurrentState
      : TaskStateNodeHighlight.CurrentState;

  const reachableNextStates = getReachableNextState(
    stateMachine,
    currentStateId
  );
  const isStateReachable = reachableNextStates.find(
    (nextState) => nextState.id === state.id
  );
  if (!isStateReachable) return TaskStateNodeHighlight.None;

  return isStateSelected
    ? TaskStateNodeHighlight.SelectedViableNextState
    : TaskStateNodeHighlight.ViableNextState;
};

const mapStateToNode = (
  state: TaskState,
  props: ComputeTaskStateMachineViewProps
): Node<TaskStateNodeData> => {
  const {
    selectableStates,
    onSelectState,
    editable,
    stateMachine,
    updateStateMachine,
    currentStateId,
    selectedStateId,
  } = props;
  const canStateBeSelected =
    !selectableStates || selectableStates?.includes(state.id);
  const onSelect = canStateBeSelected
    ? () => onSelectState?.(state.id)
    : undefined;

  return {
    id: state.id,
    data: {
      ...state,
      editable,
      stateMachine,
      updateStateMachine,
      onSelect,
      currentStateId,
      highlightType: computeNodeHighlight(
        stateMachine,
        state,
        currentStateId,
        selectedStateId
      ),
    },
    position: state.position,
    connectable: editable,
    type: "taskState",
  };
};

export const getTaskStateMachineView = (
  props: ComputeTaskStateMachineViewProps
): {
  nodes: Node<TaskState>[];
  edges: Edge<TaskStateTransition>[];
} => {
  const { stateMachine } = props;
  const nodes = stateMachine.states.map<Node<TaskState>>((state) =>
    mapStateToNode(state, props)
  );

  const edges = stateMachine.transitions.map<Edge<TaskStateTransition>>(
    (transition) => ({
      id: transition.id,
      source: transition.fromId,
      target: transition.toId,
      label: transition.name,
      type: ConnectionLineType.SmoothStep,
      markerEnd: { type: MarkerType.ArrowClosed },
    })
  );

  return { nodes, edges };
};
