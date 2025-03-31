import { TreeDataNode } from "antd";
import { createContext } from "react";

interface CategoryState {
  categoryMap: Record<string, string>;
  setCategoryMap: (categoryMap: Record<string, string>) => void;
  categoryTree: TreeDataNode[];
  setCategoryTree: (categoryTree: TreeDataNode[]) => void;
  selectedCategory: TreeDataNode | null;
  setSelectedCategory: (selectedCategory: TreeDataNode | null) => void;
}

export const CategoryContext = createContext<CategoryState>({
  categoryTree: [],
  setCategoryTree: () => {},
  categoryMap: {},
  setCategoryMap: () => {},
  selectedCategory: null,
  setSelectedCategory: () => {},
});
