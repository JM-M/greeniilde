import { HttpTypes } from "@medusajs/types";

export interface CategoryTreeNode extends HttpTypes.StoreProductCategory {
  children: CategoryTreeNode[];
}

/**
 * Builds a tree structure from flat category data
 */
export const buildCategoryTree = (
  categories: HttpTypes.StoreProductCategory[],
): CategoryTreeNode[] => {
  const categoryMap = new Map<string, CategoryTreeNode>();
  const rootNodes: CategoryTreeNode[] = [];

  // First pass: create all nodes
  categories.forEach((category) => {
    categoryMap.set(category.id, {
      ...category,
      children: [],
    });
  });

  // Second pass: build tree structure
  categories.forEach((category) => {
    const node = categoryMap.get(category.id)!;

    if (category.parent_category_id) {
      const parent = categoryMap.get(category.parent_category_id);
      if (parent) {
        parent.children.push(node);
      }
    } else {
      rootNodes.push(node);
    }
  });

  return rootNodes;
};

/**
 * Finds the path to a node (array of categories)
 */
export const findCategoryPath = (
  nodes: CategoryTreeNode[],
  targetId: string,
  currentPath: CategoryTreeNode[] = [],
): CategoryTreeNode[] | null => {
  for (const node of nodes) {
    const path = [...currentPath, node];
    if (node.id === targetId) return path;

    const childPath = findCategoryPath(node.children, targetId, path);
    if (childPath) return childPath;
  }
  return null;
};
