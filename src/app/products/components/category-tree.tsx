import { DownOutlined } from "@ant-design/icons";
import type { TreeDataNode, TreeProps } from "antd";
import { App, Button, Tree } from "antd";
import Title from "antd/es/typography/Title";
import React, {
  Key,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { getCategories } from "../../../api/categories";
import { Category } from "../../../entities/category-entity";
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
  const initRef = useRef(true);
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

  const fetchCategories = useCallback(async () => {
    try {
      const categories = await getCategories();
      return categories;
    } catch (e) {
      console.error(e);
      message.error("Something went wrong!");
    }
  }, [message]);

  const createCategoryTree = useCallback(
    (categories: Category[]) => {
      const treeData = addToTree(categories);
      const mappedTreeData = mapTreeToTreeDataNode(
        treeData.children,
        onClickTreeNode
      );
      setCategoryTreeData(mappedTreeData);
      setSelectedCategory(treeData?.children?.[0] ?? null);
    },
    [onClickTreeNode, setSelectedCategory]
  );

  const createCategoryMap = useCallback(
    (categories: Category[]) => {
      const categoryMap: Record<string, string> = {};
      categories.forEach((category) => {
        categoryMap[category.id.toString()] = category.name;
      });
      setCategoryMap(categoryMap);
    },
    [setCategoryMap]
  );

  const init = useCallback(async () => {
    const categories = await fetchCategories();
    if (!categories) {
      return;
    }

    createCategoryTree(categories);
    createCategoryMap(categories);
    setExpandedKeys(categories.map((item) => item.id));
  }, [createCategoryMap, createCategoryTree, fetchCategories]);

  useEffect(() => {
    if (initRef.current === true) {
      init();
    }

    return () => {
      initRef.current = false;
    };
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
