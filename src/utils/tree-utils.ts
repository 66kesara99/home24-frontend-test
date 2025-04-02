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
    if (node.children && node.children.length) {
      for (let i = 0; i < node.children.length; i += 1) {
        stack.push(node.children[i]);
      }
    }
  }

  return childKeys;
}

function filterMatchAndNonMatch(key: number | undefined, category: Category[]) {
  const matched: Category[] = [];
  const nonMatched: Category[] = [];

  if (!key) {
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

  const { matched: rootCategories, nonMatched: subCategories } =
    filterMatchAndNonMatch(undefined, category);

  rootCategories.forEach((category) => {
    root.children?.push({
      key: category.id,
      title: category.name,
      children: [],
    });
  });

  remainingCategories = subCategories;

  while (stack.length > 0) {
    const node: CategoryTreeNode = stack.pop()!;

    const { matched, nonMatched } = filterMatchAndNonMatch(
      node.key,
      remainingCategories
    );

    if (matched.length > 0) {
      matched.forEach((category) => {
        node.children?.push({
          key: category.id,
          title: category.name,
          children: [],
        });
      });
    }
    if (node.children && node.children.length) {
      for (let i = 0; i < node.children.length; i += 1) {
        stack.push(node.children[i]);
      }
    }
    remainingCategories = nonMatched;
  }

  return root;
}
