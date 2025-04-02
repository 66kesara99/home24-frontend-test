import { useState } from "react";
import { CategoryTreeNode } from "../../utils/tree-utils";
import { CategoryContext } from "./category-context";

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryTreeNode | null>(null);

  return (
    <CategoryContext.Provider
      value={{
        categoryMap,
        setCategoryMap,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
