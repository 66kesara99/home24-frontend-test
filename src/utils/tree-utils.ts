import { Category } from "../entities/category-entity";

export interface CategoryTreeNode {
  key: number;
  title: string;
  children?: CategoryTreeNode[];
}

export function getAllChildKeys(rootNode: CategoryTreeNode): number[] {
  const stack = [];
  const childKeys = [];
  stack.push(rootNode);

  while (stack.length > 0) {
    const node: CategoryTreeNode = stack.pop()!;
    childKeys.push(node.key);

    (node?.children ?? []).forEach((childNode) => {
      stack.push(childNode);
    });
  }

  return childKeys;
}

function filterMatchAndNonMatch(key: number, category: Category[]) {
  const matched: Category[] = [];
  const nonMatched: Category[] = [];

  if (key < 0) {
    category.forEach((category) => {
      if (!category.parent_id) {
        matched.push(category);
      } else {
        nonMatched.push(category);
      }
    });
  } else {
    category.forEach((category) => {
      if (category.parent_id === key) {
        matched.push(category);
      } else {
        nonMatched.push(category);
      }
    });
  }
  return { matched, nonMatched };
}

export function addToTree(category: Category[]): CategoryTreeNode {
  let remainingCategories = category;
  const stack = [];
  const root: CategoryTreeNode = {
    key: -1,
    title: "Root",
    children: [],
  };
  stack.push(root);

  while (stack.length > 0) {
    const node: CategoryTreeNode = stack.pop()!;

    const { matched, nonMatched } = filterMatchAndNonMatch(
      node.key,
      remainingCategories
    );

    (matched ?? []).forEach((category) => {
      node.children?.push({
        key: category.id,
        title: category.name,
        children: [],
      });
    });

    (node?.children ?? []).forEach((childNode) => {
      stack.push(childNode);
    });
    remainingCategories = nonMatched;
  }

  return root;
}
