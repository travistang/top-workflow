import computeRequiredNodeSpaces from "./computeRequiredNodeSpaces";

describe("computeRequiredNodeSpaces", () => {
  const DEFAULT_NODE_WIDTH = 200;
  const DEFAULT_MARGIN = 40;
  it("should throw when there are no nodes provided", () => {
    expect(() =>
      computeRequiredNodeSpaces([], DEFAULT_NODE_WIDTH, DEFAULT_MARGIN)
    ).toThrow();
  });

  it("should return provided node width if there is only the root node provided", () => {
    const nodes = [{ id: "1", level: 0 }];
    expect(
      computeRequiredNodeSpaces(nodes, DEFAULT_NODE_WIDTH, DEFAULT_MARGIN)
    ).toEqual([{ id: "1", level: 0, spaceRequired: DEFAULT_NODE_WIDTH }]);
  });

  it("should return provided node width for each of the nodes if a linear graph is provided", () => {
    const nodes = [
      { id: "1", level: 0 },
      { id: "2", level: 1, parentId: ["1"] },
      { id: "3", level: 2, parentId: ["2"] },
      { id: "4", level: 3, parentId: ["3"] },
      { id: "5", level: 4, parentId: ["4"] },
    ];
    expect(
      computeRequiredNodeSpaces(nodes, DEFAULT_NODE_WIDTH, DEFAULT_MARGIN)
    ).toEqual([
      { id: "1", level: 0, spaceRequired: DEFAULT_NODE_WIDTH },
      { id: "2", level: 1, parentId: ["1"], spaceRequired: DEFAULT_NODE_WIDTH },
      { id: "3", level: 2, parentId: ["2"], spaceRequired: DEFAULT_NODE_WIDTH },
      { id: "4", level: 3, parentId: ["3"], spaceRequired: DEFAULT_NODE_WIDTH },
      { id: "5", level: 4, parentId: ["4"], spaceRequired: DEFAULT_NODE_WIDTH },
    ]);
  });

  it("should return sum of node width with margins in between if there are more than one children connected to the root", () => {
    const nodes = [
      { id: "1", level: 0 },
      { id: "2", level: 1, parentId: ["1"] },
      { id: "3", level: 1, parentId: ["1"] },
      { id: "4", level: 1, parentId: ["1"] },
    ];
    expect(
      computeRequiredNodeSpaces(nodes, DEFAULT_NODE_WIDTH, DEFAULT_MARGIN)
    ).toEqual([
      {
        id: "1",
        level: 0,
        spaceRequired: 3 * DEFAULT_NODE_WIDTH + 2 * DEFAULT_MARGIN,
      },
      { id: "2", level: 1, parentId: ["1"], spaceRequired: DEFAULT_NODE_WIDTH },
      { id: "3", level: 1, parentId: ["1"], spaceRequired: DEFAULT_NODE_WIDTH },
      { id: "4", level: 1, parentId: ["1"], spaceRequired: DEFAULT_NODE_WIDTH },
    ]);
  });

  it("Should return correct results with deeper DAG", () => {
    const nodes = [
      { id: "1", level: 0 },
      { id: "2", level: 1, parentId: ["1"] },
      { id: "3", level: 1, parentId: ["1"] },
      { id: "4", level: 2, parentId: ["2"] },
    ];
    expect(
      computeRequiredNodeSpaces(nodes, DEFAULT_NODE_WIDTH, DEFAULT_MARGIN)
    ).toEqual([
      {
        id: "1",
        level: 0,
        spaceRequired: 2 * DEFAULT_NODE_WIDTH + DEFAULT_MARGIN,
      },
      {
        id: "2",
        level: 1,
        parentId: ["1"],
        spaceRequired: DEFAULT_NODE_WIDTH,
      },
      {
        id: "3",
        level: 1,
        parentId: ["1"],
        spaceRequired: DEFAULT_NODE_WIDTH,
      },
      {
        id: "4",
        level: 2,
        parentId: ["2"],
        spaceRequired: DEFAULT_NODE_WIDTH,
      },
    ]);
  });
});
