import { layoutNodes } from ".";

describe("Graph domain", () => {
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
