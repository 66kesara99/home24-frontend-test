import { createContext } from "react";
import { CategoryTreeNode } from "../../utils/tree-utils";

interface CategoryState {
  categoryMap: Record<string, string>;
  setCategoryMap: (categoryMap: Record<string, string>) => void;
  selectedCategory: CategoryTreeNode | null;
  setSelectedCategory: (selectedCategory: CategoryTreeNode | null) => void;
}

export const CategoryContext = createContext<CategoryState>({
  categoryMap: {},
  setCategoryMap: () => {},
  selectedCategory: null,
  setSelectedCategory: () => {},
});
