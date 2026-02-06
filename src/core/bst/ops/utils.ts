import { BSTNode } from '../node';

export function getHeight(root: BSTNode | null): number {
  const calculateHeight = (node: BSTNode | null): number => {
    if (!node) return -1;
    return 1 + Math.max(calculateHeight(node.left), calculateHeight(node.right));
  };
  return calculateHeight(root);
}

export function getNodeCount(root: BSTNode | null): number {
  const countNodes = (node: BSTNode | null): number => {
    if (!node) return 0;
    return 1 + countNodes(node.left) + countNodes(node.right);
  };
  return countNodes(root);
}

export function getMinValue(root: BSTNode | null): number | null {
  if (!root) return null;
  let current = root;
  while (current.left) {
    current = current.left;
  }
  return current.value;
}

export function getMaxValue(root: BSTNode | null): number | null {
  if (!root) return null;
  let current = root;
  while (current.right) {
    current = current.right;
  }
  return current.value;
}
