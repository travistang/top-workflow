import {
  createNodeMarkerMap,
  getEdges,
  getEdgesFromNode,
  getEdgesToNode,
  getRoot,
  NodeLikeData,
  validateGraph,
} from "./utils";

const computeDAGLevel = <T extends NodeLikeData>(
  nodes: T[]
): (T & { level: number })[] => {
  validateGraph(nodes);
  const root = getRoot(nodes);
  const edges = getEdges(nodes);
  const nodeMarkersMap = createNodeMarkerMap(nodes, (node) => ({
    visitedCount: 0,
    maxDistance: 0,
    numEdgesToNode: getEdgesToNode(edges, node).length,
  }));

  const queue: string[] = [root.id];
  while (queue.length > 0) {
    const nodeId = queue.shift() as string;
    const nodeMarker = nodeMarkersMap.get(nodeId)!;
    const { numEdgesToNode, visitedCount, maxDistance } = nodeMarker;
    if (visitedCount > numEdgesToNode + 1) {
      throw new Error("Graph contains cycles");
    }

    nodeMarkersMap.set(nodeId, {
      ...nodeMarker,
      visitedCount: visitedCount + 1,
    });

    const edgesFromNode = getEdgesFromNode(edges, { id: nodeId });
    for (const edge of edgesFromNode) {
      const toNodeMarker = nodeMarkersMap.get(edge.to)!;
      const maxDistanceToNode = Math.max(
        toNodeMarker.maxDistance,
        maxDistance! + 1
      );
      nodeMarkersMap.set(edge.to, {
        ...toNodeMarker,
        maxDistance: maxDistanceToNode,
      });

      if (!queue.includes(edge.to)) {
        queue.push(edge.to);
      }
    }
  }

  return nodes.map((node) => ({
    ...node,
    level: nodeMarkersMap.get(node.id)!.maxDistance,
  }));
};

export default computeDAGLevel;
