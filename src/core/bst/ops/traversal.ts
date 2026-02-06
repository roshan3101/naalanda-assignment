import { BSTNode } from '../node';
import type { BSTStep } from '../../../types';

export function inorderTraversal(root: BSTNode | null): BSTStep[] {
  const steps: BSTStep[] = [];
  
  const traverse = (node: BSTNode | null) => {
    if (!node) return;
    traverse(node.left);
    steps.push({ 
      type: 'traverse', 
      nodeValue: node.value, 
      description: `In-order visit: ${node.value}`,
      algorithmLine: 3
    });
    traverse(node.right);
  };

  traverse(root);
  return steps;
}

export function preorderTraversal(root: BSTNode | null): BSTStep[] {
  const steps: BSTStep[] = [];
  
  const traverse = (node: BSTNode | null) => {
    if (!node) return;
    steps.push({ 
      type: 'traverse', 
      nodeValue: node.value, 
      description: `Pre-order visit: ${node.value}`,
      algorithmLine: 3
    });
    traverse(node.left);
    traverse(node.right);
  };

  traverse(root);
  return steps;
}

export function postorderTraversal(root: BSTNode | null): BSTStep[] {
  const steps: BSTStep[] = [];
  
  const traverse = (node: BSTNode | null) => {
    if (!node) return;
    traverse(node.left);
    traverse(node.right);
    steps.push({ 
      type: 'traverse', 
      nodeValue: node.value, 
      description: `Post-order visit: ${node.value}`,
      algorithmLine: 3
    });
  };

  traverse(root);
  return steps;
}
