import { BSTNode } from './bst';
import type { PositionedNode } from '../types';

/**
 * Calculates coordinates for each node in a BST.
 * Uses a recursive approach where each level has a fixed Y increase,
 * and X is determined by the subtree width.
 */
export function calculateLayout(
  root: BSTNode | null,
  canvasWidth: number = 800,
  rowHeight: number = 80
): PositionedNode[] {
  const nodes: PositionedNode[] = [];

  const traverse = (
    node: BSTNode | null,
    depth: number,
    leftBound: number,
    rightBound: number
  ) => {
    if (!node) return;

    const x = (leftBound + rightBound) / 2;
    const y = (depth + 1) * rowHeight;

    nodes.push({
      id: node.value.toString(),
      value: node.value,
      x,
      y,
      leftId: node.left ? node.left.value.toString() : null,
      rightId: node.right ? node.right.value.toString() : null,
    });

    traverse(node.left, depth + 1, leftBound, x);
    traverse(node.right, depth + 1, x, rightBound);
  };

  traverse(root, 0, 0, canvasWidth);
  return nodes;
}
