import { XYPosition } from "reactflow";
import computeDAGLevel from "./computeDAGLevel";
import computeRequiredNodeSpaces from "./computeRequiredNodeSpaces";
import { NodeLikeData } from "./utils";

export const layoutNodes = <T extends NodeLikeData>(
  nodes: T[],
  config = {
    nodeWidth: 200,
    margin: 40,
    rootPosition: { x: 0, y: 0 },
    layerHeight: 40,
  }
): (T & { position: XYPosition })[] => {
  const { nodeWidth, margin, layerHeight, rootPosition } = config;
  const nodesWithLevels = computeDAGLevel(nodes);
  const nodesWithRequiredSpaceAndLevel = computeRequiredNodeSpaces(
    nodesWithLevels,
    nodeWidth,
    margin
  );
  // TODO: this
  return [];
};
