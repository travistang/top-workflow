import { ConnectionLineType, Edge, MarkerType, Node } from "reactflow";
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
  selectableStates?: string[];
  onSelectState?: (stateId: string) => void;
};

export type TaskStateNodeData = TaskState & {
  editable?: boolean;
  stateMachine: TaskStateMachine;
  updateStateMachine?: (newMachine: TaskStateMachine) => void;
  onSelect?: () => void;
  currentStateId?: string;
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
    },
    selected: state.id === currentStateId,
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
