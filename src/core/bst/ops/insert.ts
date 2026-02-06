import { BSTNode } from '../node';
import type { BSTStep } from '../../../types';

export function insertValue(root: BSTNode | null, value: number): { root: BSTNode; steps: BSTStep[] } {
  const steps: BSTStep[] = [];
  
  if (!root) {
    const newRoot = new BSTNode(value);
    steps.push({ 
      type: 'insert', 
      nodeValue: value, 
      description: `Tree was empty. Set ${value} as root.`,
      nodeState: 'appearing',
      algorithmLine: 1
    });
    return { root: newRoot, steps };
  }

  let current = root;
  while (true) {
    steps.push({ 
      type: 'visit', 
      nodeValue: current.value, 
      description: `Visiting node ${current.value}` 
    });

    steps.push({
      type: 'compare',
      nodeValue: current.value,
      description: `Comparing ${value} with ${current.value}`,
      algorithmLine: 2,
      comparison: `${value} vs ${current.value}`
    });

    if (value < current.value) {
      if (!current.left) {
        current.left = new BSTNode(value);
        steps.push({ 
          type: 'insert', 
          nodeValue: value, 
          description: `Creating new node ${value} to the left of ${current.value}`,
          algorithmLine: 1,
          comparison: `${value} < ${current.value}, insert left`,
          nodeState: 'appearing',
          highlightEdge: { from: current.value, to: value }
        });
        steps.push({ 
          type: 'insert', 
          nodeValue: value, 
          description: `Inserted ${value} to the left of ${current.value}`,
          algorithmLine: 1,
          comparison: `${value} < ${current.value}`,
          nodeState: 'normal'
        });
        break;
      }
      steps.push({
        type: 'visit',
        nodeValue: current.value,
        description: `Going left from ${current.value}`,
        algorithmLine: 3,
        comparison: `${value} < ${current.value}`,
        highlightEdge: { from: current.value, to: current.left.value }
      });
      current = current.left;
    } else if (value > current.value) {
      if (!current.right) {
        current.right = new BSTNode(value);
        steps.push({ 
          type: 'insert', 
          nodeValue: value, 
          description: `Creating new node ${value} to the right of ${current.value}`,
          algorithmLine: 1,
          comparison: `${value} > ${current.value}, insert right`,
          nodeState: 'appearing',
          highlightEdge: { from: current.value, to: value }
        });
        steps.push({ 
          type: 'insert', 
          nodeValue: value, 
          description: `Inserted ${value} to the right of ${current.value}`,
          algorithmLine: 1,
          comparison: `${value} > ${current.value}`,
          nodeState: 'normal'
        });
        break;
      }
      steps.push({
        type: 'visit',
        nodeValue: current.value,
        description: `Going right from ${current.value}`,
        algorithmLine: 5,
        comparison: `${value} > ${current.value}`,
        highlightEdge: { from: current.value, to: current.right.value }
      });
      current = current.right;
    } else {
      steps.push({ 
        type: 'visit', 
        nodeValue: current.value, 
        description: `Value ${value} already exists in the tree.`,
        algorithmLine: 6,
        comparison: `${value} == ${current.value}`
      });
      break; 
    }
  }
  
  return { root, steps };
}
