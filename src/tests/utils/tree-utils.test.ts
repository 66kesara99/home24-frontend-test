import { describe, expect, it } from "vitest";
import { Category } from "../../entities/category-entity";
import {
  addToTree,
  CategoryTreeNode,
  getAllChildKeys,
} from "../../utils/tree-utils";

describe("tree-utils", () => {
  describe("getAllChildKeys", () => {
    it("should return all keys from a simple tree", () => {
      const tree: CategoryTreeNode = {
        key: 1,
        title: "Root",
        children: [
          { key: 2, title: "Child 1" },
          { key: 3, title: "Child 2" },
        ],
      };

      const result = getAllChildKeys(tree);
      expect(result).toEqual([1, 3, 2]);
    });

    it("should return all keys from a nested tree", () => {
      const tree: CategoryTreeNode = {
        key: 1,
        title: "Root",
        children: [
          {
            key: 2,
            title: "Child 1",
            children: [
              { key: 4, title: "Grandchild 1" },
              { key: 5, title: "Grandchild 2" },
            ],
          },
          { key: 3, title: "Child 2" },
        ],
      };

      const result = getAllChildKeys(tree);
      expect(result).toEqual([1, 3, 2, 5, 4]);
    });

    it("should return only root key for a tree with no children", () => {
      const tree: CategoryTreeNode = {
        key: 1,
        title: "Root",
      };

      const result = getAllChildKeys(tree);
      expect(result).toEqual([1]);
    });
  });

  describe("addToTree", () => {
    it("should create a tree from flat categories", () => {
      const categories: Category[] = [
        { id: 1, name: "Category 1", parent_id: undefined },
        { id: 2, name: "Category 2", parent_id: 1 },
        { id: 3, name: "Category 3", parent_id: 1 },
        { id: 4, name: "Category 4", parent_id: 2 },
      ];

      const result = addToTree(categories);

      expect(result).toEqual({
        key: -1,
        title: "Root",
        children: [
          {
            key: 1,
            title: "Category 1",
            children: [
              {
                key: 2,
                title: "Category 2",
                children: [{ key: 4, title: "Category 4", children: [] }],
              },
              { key: 3, title: "Category 3", children: [] },
            ],
          },
        ],
      });
    });

    it("should handle empty categories array", () => {
      const categories: Category[] = [];
      const result = addToTree(categories);

      expect(result).toEqual({
        key: -1,
        title: "Root",
        children: [],
      });
    });

    it("should handle categories with no parent", () => {
      const categories: Category[] = [
        { id: 1, name: "Category 1", parent_id: undefined },
        { id: 2, name: "Category 2", parent_id: undefined },
      ];

      const result = addToTree(categories);

      expect(result).toEqual({
        key: -1,
        title: "Root",
        children: [
          { key: 1, title: "Category 1", children: [] },
          { key: 2, title: "Category 2", children: [] },
        ],
      });
    });
  });
});
