import { BSTNode } from '../node';
import type { BSTStep } from '../../../types';

export function searchValue(root: BSTNode | null, value: number): BSTStep[] {
  const steps: BSTStep[] = [];
  let current = root;

  while (current) {
    steps.push({ 
      type: 'visit', 
      nodeValue: current.value, 
      description: `Visiting node ${current.value}` 
    });

    steps.push({
      type: 'compare',
      nodeValue: current.value,
      description: `Comparing target ${value} with ${current.value}`,
      algorithmLine: 2,
      comparison: `${value} vs ${current.value}`
    });

    if (value === current.value) {
      steps.push({ 
        type: 'found', 
        nodeValue: value, 
        description: `Found ${value}!`,
        algorithmLine: 3,
        comparison: `${value} == ${current.value}`
      });
      return steps;
    }

    if (value < current.value) {
      if (current.left) {
        steps.push({
          type: 'visit',
          nodeValue: current.value,
          description: `Going left from ${current.value}`,
          algorithmLine: 5,
          comparison: `${value} < ${current.value}`,
          highlightEdge: { from: current.value, to: current.left.value }
        });
      }
      current = current.left;
    } else {
      if (current.right) {
        steps.push({
          type: 'visit',
          nodeValue: current.value,
          description: `Going right from ${current.value}`,
          algorithmLine: 7,
          comparison: `${value} > ${current.value}`,
          highlightEdge: { from: current.value, to: current.right.value }
        });
      }
      current = current.right;
    }
  }

  steps.push({ 
    type: 'not_found', 
    nodeValue: value, 
    description: `${value} not found in the tree.`,
    algorithmLine: 1,
    comparison: `Reached null, ${value} not found`
  });
  return steps;
}
