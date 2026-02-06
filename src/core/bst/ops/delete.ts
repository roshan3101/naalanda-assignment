import { BSTNode } from '../node';
import type { BSTStep } from '../../../types';

export function deleteValue(root: BSTNode | null, value: number): { root: BSTNode | null; steps: BSTStep[] } {
  const steps: BSTStep[] = [];
  
  const deleteNode = (node: BSTNode | null, val: number): BSTNode | null => {
    if (!node) {
      steps.push({ 
        type: 'not_found', 
        nodeValue: val, 
        description: `${val} not found to delete.` 
      });
      return null;
    }

    steps.push({ 
      type: 'visit', 
      nodeValue: node.value, 
      description: `Visiting ${node.value} during deletion search.` 
    });

    if (val < node.value) {
      node.left = deleteNode(node.left, val);
      return node;
    } else if (val > node.value) {
      node.right = deleteNode(node.right, val);
      return node;
    } else {
      // Found the node to delete
      steps.push({ 
        type: 'delete', 
        nodeValue: node.value, 
        description: `Found node ${node.value} to delete.` 
      });

      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let successor = node.right;
      while (successor.left) {
        successor = successor.left;
      }

      steps.push({ 
        type: 'visit', 
        nodeValue: successor.value, 
        description: `Found in-order successor ${successor.value} to replace ${node.value}.` 
      });

      node.value = successor.value;
      node.right = deleteNode(node.right, successor.value);
      return node;
    }
  };

  const newRoot = deleteNode(root, value);
  return { root: newRoot, steps };
}
