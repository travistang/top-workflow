import { XYPosition } from "reactflow";

export type NodeLikeData = { id: string, parentId?: string[]; };

// TODO: Topological sorting
export const layoutNodes = <T extends NodeLikeData>(
  nodes: T[]
): (T & { position: XYPosition })[] => {
  return nodes.map((node) => ({
    ...node,
    position: {
      x: Math.random() * 500,
      y: Math.random() * 500,
    },
  }));
};