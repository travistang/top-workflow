import { layoutNodes, maxDistanceOfEachNodeFromRoot } from ".";

describe("Graph domain", () => {
  describe("maxDistanceOfEachNodeFromRoot", () => {
    it("should return empty list when the graph is empty", () => {
      expect(() => maxDistanceOfEachNodeFromRoot([])).toThrow();
    });

    it("should return one node of distance 0 when the graph has one node having no parent (root)", () => {
      expect(maxDistanceOfEachNodeFromRoot([{ id: "1" }])).toEqual([
        {
          id: "1",
          level: 0,
        },
      ]);
    });

    it("should throw error when there are no roots in nodes", () => {
      expect(() =>
        maxDistanceOfEachNodeFromRoot([{ id: "1", parentId: ["2"] }])
      ).toThrow();
    });

    it("should throw error when there are more than one roots in nodes", () => {
      expect(() =>
        maxDistanceOfEachNodeFromRoot([
          { id: "1", parentId: ["2"] },
          { id: "2", parentId: ["3"] },
        ])
      ).toThrow();
    });

    it("should throw error when there are nodes that connects to itself (cycle)", () => {
      const nodes = [
        { id: "1", parentId: [] },
        { id: "2", parentId: ["1", "2"] },
      ];

      expect(() => maxDistanceOfEachNodeFromRoot(nodes)).toThrowError(
        new Error("Graph contains cycles")
      );
    });

    it("should throw error when there are nodes connecting to each other (cycle)", () => {
      const nodes = [
        { id: "1", parentId: [] },
        { id: "2", parentId: ["1"] },
        { id: "3", parentId: ["2", "4"] },
        { id: "4", parentId: ["2", "3"] },
      ];

      expect(() => maxDistanceOfEachNodeFromRoot(nodes)).toThrowError(
        new Error("Graph contains cycles")
      );
    });

    it("should throw error when there are long loops", () => {
      const nodes = [
        { id: "1", parentId: [] },
        { id: "2", parentId: ["1"] },
        { id: "3", parentId: ["2", "6"] },
        { id: "4", parentId: ["3"] },
        { id: "5", parentId: ["4"] },
        { id: "6", parentId: ["5", "3"] },
      ];

      expect(() => maxDistanceOfEachNodeFromRoot(nodes)).toThrowError(
        new Error("Graph contains cycles")
      );
    });

    it("should return correct order when all nodes have 1 parent", () => {
      const nodes = [
        { id: "1", parentId: [] },
        { id: "2", parentId: ["1"] },
        { id: "3", parentId: ["2"] },
        { id: "4", parentId: ["2"] },
        { id: "5", parentId: ["3"] },
      ];

      expect(maxDistanceOfEachNodeFromRoot(nodes)).toEqual([
        { id: "1", parentId: [], level: 0 },
        { id: "2", parentId: ["1"], level: 1 },
        { id: "3", parentId: ["2"], level: 2 },
        { id: "4", parentId: ["2"], level: 2 },
        { id: "5", parentId: ["3"], level: 3 },
      ]);
    });

    it("should return correct order when all nodes have multiple parents", () => {
      const nodes = [
        { id: "1", parentId: [] },
        { id: "2", parentId: ["1"] },
        { id: "3", parentId: ["1", "2"] },
        { id: "4", parentId: ["2", "3", "1"] },
        { id: "5", parentId: ["3", "4"] },
      ];

      expect(maxDistanceOfEachNodeFromRoot(nodes)).toEqual([
        { id: "1", parentId: [], level: 0 },
        { id: "2", parentId: ["1"], level: 1 },
        { id: "3", parentId: ["1", "2"], level: 2 },
        { id: "4", parentId: ["2", "3", "1"], level: 3 },
        { id: "5", parentId: ["3", "4"], level: 4 },
      ]);
    });
  });

  describe("layoutNodes", () => {
    it("Should layout correctly when there is one node", () => {
      const nodes = [{ id: "1" }];

      expect(layoutNodes(nodes)).toEqual([
        { id: "1", position: { x: 0, y: 0 } },
      ]);
    });

    it("Should layout vertically when there are multiple nodes with exactly one parent", () => {
      const nodes = [
        { id: "1" },
        { id: "2", parentId: ["1"] },
        { id: "3", parentId: ["2"] },
        { id: "4", parentId: ["3"] },
      ];
      expect(layoutNodes(nodes)).toEqual([
        { id: "1", position: { x: 0, y: 0 } },
        { id: "2", parentId: ["1"], position: { x: 0, y: 40 } },
        { id: "3", parentId: ["2"], position: { x: 0, y: 80 } },
        { id: "4", parentId: ["3"], position: { x: 0, y: 120 } },
      ]);
    });
  });
});
