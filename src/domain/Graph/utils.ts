export type NodeLikeData = { id: string; parentId?: string[] };
export type EdgeLike = { from: string; to: string };

export const getNodeById = <T extends NodeLikeData>(
  nodes: T[],
  id: string
): T | null => {
  return nodes.find((n) => n.id === id) ?? null;
};

export const getEdges = <T extends NodeLikeData>(nodes: T[]): EdgeLike[] => {
  return nodes.flatMap((node) => {
    if (!node.parentId?.length) return [];
    return node.parentId.map((parentId) => ({ from: parentId, to: node.id }));
  });
};

export const getEdgesFromNode = <T extends NodeLikeData>(
  edges: EdgeLike[],
  fromNode: T
) => {
  return edges.filter((edge) => edge.from === fromNode.id);
};

export const getEdgesToNode = <T extends NodeLikeData>(
  edges: EdgeLike[],
  toNode: T
) => {
  return edges.filter((edge) => edge.to === toNode.id);
};

export const getSuccessors = <T extends NodeLikeData>(nodes: T[], node: T) => {
  return nodes.filter((n) => n.parentId?.includes(node.id));
};

export const createNodeMarkerMap = <T extends NodeLikeData, U>(
  nodes: T[],
  initializer: (node: T) => U
): Map<string, U> => {
  const nodeMarkers = new Map<string, U>();
  nodes.forEach((node) => {
    nodeMarkers.set(node.id, initializer(node));
  });
  return nodeMarkers;
};

export const getRoot = <T extends NodeLikeData>(nodes: T[]) => {
  const maybeRoots = nodes.filter((node) => !node.parentId?.length);
  if (maybeRoots.length !== 1)
    throw new Error("There must be exactly one root in the given graph");
  return maybeRoots[0];
};

export const validateGraph = <T extends NodeLikeData>(nodes: T[]) => {
  if (nodes.length === 0) throw new Error("Graph is empty");
  const edges = getEdges(nodes);
  const nodeIdInEdges = edges.flatMap((edge) => [edge.from, edge.to]);
  if (nodeIdInEdges.some((id) => !nodes.find((node) => node.id === id))) {
    throw new Error("Some nodes use non-existing node id as parent");
  }

  const root = getRoot(nodes);
  if (
    nodes.some(
      (node) => node.id !== root.id && !nodeIdInEdges.includes(node.id)
    )
  ) {
    throw new Error("Some nodes are disconnected");
  }
};
