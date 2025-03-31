import type { TreeProps } from "antd";
import { App, Tree } from "antd";
import Title from "antd/es/typography/Title";
import React, {
  Key,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { getCategories } from "../api/products";
import { CategoryContext } from "../state/category-state/category-context";
import { mapToTreeDataNode } from "../utils/tree-utils";

interface Props {
  onClickNode?: () => void;
}

const CategoryTree: React.FC<Props> = ({ onClickNode }) => {
  const { categoryTree, setCategoryTree, setSelectedCategory, setCategoryMap } =
    useContext(CategoryContext);
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);

  const init = useCallback(async () => {
    try {
      const categories = await getCategories();

      const treeData = mapToTreeDataNode(categories);
      setCategoryTree(treeData);

      const categoryMap: Record<string, string> = {};
      categories.forEach((category) => {
        categoryMap[category.id.toString()] = category.name;
      });
      setCategoryMap(categoryMap);

      setExpandedKeys(treeData.map((item) => item.key));
      setSelectedCategory(treeData[0]);
    } catch (e) {
      console.error(e);
      message.error("Something went wrong!");
    }
  }, [message, setCategoryMap, setCategoryTree, setSelectedCategory]);

  useEffect(() => {
    init();
  }, [init]);

  const onSelect: TreeProps["onSelect"] = (_, info) => {
    setSelectedCategory(info.selectedNodes[0]);
    navigate("/products/");
    if (onClickNode) onClickNode();
  };

  const onExpand: TreeProps["onExpand"] = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
  };

  return (
    <div style={{ padding: "16px" }}>
      <Title level={4}>Categories</Title>
      {categoryTree && (
        <Tree
          onSelect={onSelect}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          treeData={categoryTree}
        />
      )}
    </div>
  );
};

export default CategoryTree;
