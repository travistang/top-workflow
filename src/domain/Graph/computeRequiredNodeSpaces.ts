import {
  createNodeMarkerMap,
  getNodeById,
  getRoot,
  getSuccessors,
  NodeLikeData,
} from "./utils";

const getSpanningTree = <T extends NodeLikeData>(
  nodes: (T & { level: number })[]
) => {
  return nodes.map((node) => {
    const firstParentAtPreviousLevel = node.parentId?.find(
      (parentId) => getNodeById(nodes, parentId)?.level === node.level - 1
    );

    return {
      ...node,
      parentId: firstParentAtPreviousLevel
        ? [firstParentAtPreviousLevel]
        : undefined,
    };
  });
};

const computeRequiredNodeSpaces = <T extends NodeLikeData>(
  nodes: (T & { level: number })[],
  nodeWidth: number,
  margin: number
): (T & { spaceRequired: number; level: number })[] => {
  const spanningTree = getSpanningTree(nodes);
  const root = getRoot(spanningTree);
  const nodeMarkersMap = createNodeMarkerMap(nodes, (node) => ({
    visited: false,
    level: node.level,
    spaceRequired: 0,
  }));

  const computeRequiredSpace = (searchNode: T) => {
    const nodeMarker = nodeMarkersMap.get(searchNode.id)!;
    if (nodeMarker.visited) return nodeMarker.spaceRequired;
    nodeMarkersMap.set(searchNode.id, { ...nodeMarker, visited: true });
    const children = getSuccessors(nodes, searchNode);

    children.forEach((child) => {
      computeRequiredSpace(child);
    });

    if (children.length <= 1) {
      const spaceRequired =
        children.length === 0
          ? nodeWidth
          : nodeMarkersMap.get(children[0].id)!.spaceRequired;
      nodeMarkersMap.set(searchNode.id, {
        ...nodeMarker,
        spaceRequired,
      });
      return;
    }

    const totalSpacesRequiredFromChildren = children.reduce((total, child) => {
      const childMarkers = nodeMarkersMap.get(child.id)!;
      return total + childMarkers.spaceRequired;
    }, 0);

    nodeMarkersMap.set(searchNode.id, {
      ...nodeMarker,
      spaceRequired:
        totalSpacesRequiredFromChildren + (children.length - 1) * margin,
    });
  };

  computeRequiredSpace(root);

  return nodes.map((node) => ({
    ...node,
    spaceRequired: nodeMarkersMap.get(node.id)!.spaceRequired,
  }));
};

export default computeRequiredNodeSpaces;
