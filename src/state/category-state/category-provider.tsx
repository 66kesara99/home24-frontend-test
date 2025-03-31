import { TreeDataNode } from "antd";
import { useState } from "react";
import { CategoryContext } from "./category-context";

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [categoryTree, setCategoryTree] = useState<TreeDataNode[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<TreeDataNode | null>(
    null
  );

  return (
    <CategoryContext.Provider
      value={{
        categoryTree,
        setCategoryTree,
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
