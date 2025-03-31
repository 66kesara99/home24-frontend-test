import { TreeDataNode } from "antd";
import { Category } from "../entities/category-entity";

export const mapToTreeDataNode = (categoryList: Category[]): TreeDataNode[] => {
  const rootCategories = categoryList.filter((category) => !category.parent_id);

  const categoryTree: TreeDataNode[] = rootCategories.map((category) => ({
    title: category.name,
    key: category.id.toString(),
  }));

  const subCategories = categoryList.filter(
    (category) => category.parent_id !== null
  );

  subCategories.forEach((category) => {
    const parentCategory = categoryTree.find(
      (cat) => cat.key === category.parent_id?.toString()
    );
    if (parentCategory) {
      if (!parentCategory.children) {
        parentCategory.children = [];
      }
      parentCategory.children.push({
        title: category.name,
        key: category.id.toString(),
      });
    }
  });

  return categoryTree;
};
