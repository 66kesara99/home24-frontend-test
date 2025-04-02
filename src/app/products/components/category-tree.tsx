import { DownOutlined } from "@ant-design/icons";
import type { TreeDataNode, TreeProps } from "antd";
import { App, Button, Tree } from "antd";
import Title from "antd/es/typography/Title";
import React, {
  Key,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { getCategories } from "../../../api/categories";
import { CategoryContext } from "../../../state/category-state/category-context";
import { addToTree, CategoryTreeNode } from "../../../utils/tree-utils";

interface Props {
  onClickNode?: () => void;
}

const mapTreeToTreeDataNode = (
  categoryTreeChildren: CategoryTreeNode[] | undefined,
  onClickTreeNode: (node: CategoryTreeNode) => void
): TreeDataNode[] => {
  if (!categoryTreeChildren) {
    return [];
  }

  return categoryTreeChildren?.map((node) => ({
    title: (
      <Button onClick={() => onClickTreeNode(node)} type="link">
        {node.title}
      </Button>
    ),
    key: node.key,
    children: mapTreeToTreeDataNode(node?.children, onClickTreeNode),
  }));
};

const CategoryTree: React.FC<Props> = ({ onClickNode }) => {
  const { setSelectedCategory, setCategoryMap } = useContext(CategoryContext);

  const navigate = useNavigate();
  const { message } = App.useApp();

  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [categoryTreeData, setCategoryTreeData] = useState<TreeDataNode[]>([]);

  const onClickTreeNode = useCallback(
    (treeNode: CategoryTreeNode) => {
      setSelectedCategory(treeNode);
      navigate("/products/");
      if (onClickNode) onClickNode();
    },
    [navigate, onClickNode, setSelectedCategory]
  );

  const init = useCallback(async () => {
    try {
      const categories = await getCategories();

      const treeData = addToTree(categories);

      const mappedTreeData = mapTreeToTreeDataNode(
        treeData.children,
        onClickTreeNode
      );
      setCategoryTreeData(mappedTreeData);

      const categoryMap: Record<string, string> = {};
      categories.forEach((category) => {
        categoryMap[category.id.toString()] = category.name;
      });
      setCategoryMap(categoryMap);

      setExpandedKeys(categories.map((item) => item.id));
      setSelectedCategory(treeData?.children?.[0] ?? null);
    } catch (e) {
      console.error(e);
      message.error("Something went wrong!");
    }
  }, [message, onClickTreeNode, setCategoryMap, setSelectedCategory]);

  useEffect(() => {
    init();
  }, [init]);

  const onExpand: TreeProps["onExpand"] = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
  };

  return (
    <div style={{ padding: "0 16px" }}>
      <Title level={4}>Categories</Title>
      {categoryTreeData && (
        <Tree
          selectable={false}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          treeData={categoryTreeData}
          showLine
          switcherIcon={<DownOutlined />}
        />
      )}
    </div>
  );
};

export default CategoryTree;
