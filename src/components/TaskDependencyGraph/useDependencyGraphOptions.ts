import { Edge, Node, MarkerType, ConnectionLineType } from "reactflow";
import { CachedTask } from "../../atoms/tasks";
import { layoutNodes } from "../../domain/Graph";

export default function useDependencyGraphOptions(allTasks: CachedTask[]) {
  const edges: Edge[] = allTasks.flatMap((task) => {
    if (!task.parentId?.length) return [];

    return task.parentId.map<Edge<unknown>>((parentId) => ({
      id: `${task.id}-${parentId}`,
      source: parentId,
      target: task.id,
      markerEnd: { type: MarkerType.ArrowClosed },
      type: ConnectionLineType.SmoothStep,
    }));
  });

  const nodes: Node<CachedTask>[] = layoutNodes(allTasks).map(nodeWithPosition => ({
    id: nodeWithPosition.id,
    position: nodeWithPosition.position,
    data: nodeWithPosition,
    type: "task",
  }));

  return {
    nodes,
    edges,
  };
}