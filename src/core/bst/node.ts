/**
 * Represents a node in the Binary Search Tree.
 */
export class BSTNode {
  value: number;
  left: BSTNode | null = null;
  right: BSTNode | null = null;

  constructor(value: number) {
    this.value = value;
  }

  static clone(node: BSTNode | null): BSTNode | null {
    if (!node) return null;
    const newNode = new BSTNode(node.value);
    newNode.left = BSTNode.clone(node.left);
    newNode.right = BSTNode.clone(node.right);
    return newNode;
  }
}
