import { BSTNode } from '../node';
import type { BSTStep } from '../../../types';

export function findMin(root: BSTNode | null): BSTStep[] {
  const steps: BSTStep[] = [];
  if (!root) {
    steps.push({ type: 'not_found', nodeValue: null, description: 'Tree is empty.' });
    return steps;
  }

  let current = root;
  steps.push({ type: 'visit', nodeValue: current.value, description: `Starting at root ${current.value}`, algorithmLine: 0 });
  while (current.left) {
    steps.push({ 
      type: 'visit', 
      nodeValue: current.value, 
      description: `Visiting ${current.value}, going left...`,
      algorithmLine: 1,
      comparison: `left child exists, go left`
    });
    current = current.left;
  }
  steps.push({ 
    type: 'found', 
    nodeValue: current.value, 
    description: `Minimum value is ${current.value}`,
    algorithmLine: 3,
    comparison: `No left child, found min: ${current.value}`
  });
  return steps;
}

export function findMax(root: BSTNode | null): BSTStep[] {
  const steps: BSTStep[] = [];
  if (!root) {
    steps.push({ type: 'not_found', nodeValue: null, description: 'Tree is empty.' });
    return steps;
  }

  let current = root;
  steps.push({ type: 'visit', nodeValue: current.value, description: `Starting at root ${current.value}`, algorithmLine: 0 });
  while (current.right) {
    steps.push({ 
      type: 'visit', 
      nodeValue: current.value, 
      description: `Visiting ${current.value}, going right...`,
      algorithmLine: 1,
      comparison: `right child exists, go right`
    });
    current = current.right;
  }
  steps.push({ 
    type: 'found', 
    nodeValue: current.value, 
    description: `Maximum value is ${current.value}`,
    algorithmLine: 3,
    comparison: `No right child, found max: ${current.value}`
  });
  return steps;
}

export function findSuccessor(root: BSTNode | null, value: number): BSTStep[] {
  const steps: BSTStep[] = [];
  let current = root;
  let successor: BSTNode | null = null;

  while (current && current.value !== value) {
    steps.push({ 
      type: 'visit', 
      nodeValue: current.value, 
      description: `Searching for ${value}, visiting ${current.value}`,
      algorithmLine: 0,
      comparison: `${value} vs ${current.value}`
    });
    if (value < current.value) {
      successor = current;
      current = current.left;
    } else {
      current = current.right;
    }
  }

  if (!current) {
    steps.push({ type: 'not_found', nodeValue: value, description: `${value} not found in tree.` });
    return steps;
  }

  steps.push({ type: 'found', nodeValue: current.value, description: `Found ${value}`, algorithmLine: 0 });

  if (current.right) {
    current = current.right;
    while (current.left) {
      steps.push({ 
        type: 'visit', 
        nodeValue: current.value, 
        description: `Going left to find successor...`,
        algorithmLine: 2,
        comparison: `Finding leftmost in right subtree`
      });
      current = current.left;
    }
    steps.push({ 
      type: 'found', 
      nodeValue: current.value, 
      description: `Successor of ${value} is ${current.value}`,
      algorithmLine: 2,
      comparison: `Successor: ${current.value}`
    });
  } else if (successor) {
    steps.push({ 
      type: 'found', 
      nodeValue: successor.value, 
      description: `Successor of ${value} is ${successor.value}`,
      algorithmLine: 4,
      comparison: `Successor: ${successor.value}`
    });
  } else {
    steps.push({ type: 'not_found', nodeValue: null, description: `${value} has no successor (it's the maximum).` });
  }

  return steps;
}

export function findPredecessor(root: BSTNode | null, value: number): BSTStep[] {
  const steps: BSTStep[] = [];
  let current = root;
  let predecessor: BSTNode | null = null;

  while (current && current.value !== value) {
    steps.push({ 
      type: 'visit', 
      nodeValue: current.value, 
      description: `Searching for ${value}, visiting ${current.value}`,
      algorithmLine: 0,
      comparison: `${value} vs ${current.value}`
    });
    if (value > current.value) {
      predecessor = current;
      current = current.right;
    } else {
      current = current.left;
    }
  }

  if (!current) {
    steps.push({ type: 'not_found', nodeValue: value, description: `${value} not found in tree.` });
    return steps;
  }

  steps.push({ type: 'found', nodeValue: current.value, description: `Found ${value}` });

  if (current.left) {
    current = current.left;
    while (current.right) {
      steps.push({ 
        type: 'visit', 
        nodeValue: current.value, 
        description: `Going right to find predecessor...`,
        algorithmLine: 2,
        comparison: `Finding rightmost in left subtree`
      });
      current = current.right;
    }
    steps.push({ 
      type: 'found', 
      nodeValue: current.value, 
      description: `Predecessor of ${value} is ${current.value}`,
      algorithmLine: 2,
      comparison: `Predecessor: ${current.value}`
    });
  } else if (predecessor) {
    steps.push({ 
      type: 'found', 
      nodeValue: predecessor.value, 
      description: `Predecessor of ${value} is ${predecessor.value}`,
      algorithmLine: 4,
      comparison: `Predecessor: ${predecessor.value}`
    });
  } else {
    steps.push({ type: 'not_found', nodeValue: null, description: `${value} has no predecessor (it's the minimum).` });
  }

  return steps;
}
