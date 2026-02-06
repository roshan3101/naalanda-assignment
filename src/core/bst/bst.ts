import { BSTNode } from './node';
import type { BSTStep } from '../../types';
import { insertValue } from './ops/insert';
import { searchValue } from './ops/search';
import { deleteValue } from './ops/delete';
import { inorderTraversal, preorderTraversal, postorderTraversal } from './ops/traversal';
import { findMin, findMax, findSuccessor, findPredecessor } from './ops/query';
import { getHeight, getNodeCount, getMinValue, getMaxValue } from './ops/utils';

export class BST {
  root: BSTNode | null = null;

  insert(value: number): BSTStep[] {
    const clone = BSTNode.clone(this.root);
    const result = insertValue(clone, value);
    return result.steps;
  }

  /**
   * Commits an insertion to the actual tree structure.
   * Useful for syncing with animation steps.
   */
  commitInsert(value: number) {
    const result = insertValue(this.root, value);
    this.root = result.root;
  }

  /**
   * Inserts a value immediately into the tree without returning animation steps.
   * Useful for initializing the tree with data.
   */
  insertSilent(value: number) {
    this.commitInsert(value);
  }

  search(value: number): BSTStep[] {
    return searchValue(this.root, value);
  }

  delete(value: number): BSTStep[] {
    const clone = BSTNode.clone(this.root);
    const result = deleteValue(clone, value);
    return result.steps;
  }

  /**
   * Commits a deletion to the actual tree structure.
   */
  commitDelete(value: number) {
    const result = deleteValue(this.root, value);
    this.root = result.root;
  }

  inorderTraversal(): BSTStep[] {
    return inorderTraversal(this.root);
  }

  preorderTraversal(): BSTStep[] {
    return preorderTraversal(this.root);
  }

  postorderTraversal(): BSTStep[] {
    return postorderTraversal(this.root);
  }

  findMin(): BSTStep[] {
    return findMin(this.root);
  }

  findMax(): BSTStep[] {
    return findMax(this.root);
  }

  findSuccessor(value: number): BSTStep[] {
    return findSuccessor(this.root, value);
  }

  findPredecessor(value: number): BSTStep[] {
    return findPredecessor(this.root, value);
  }

  getHeight(): number {
    return getHeight(this.root);
  }

  getNodeCount(): number {
    return getNodeCount(this.root);
  }

  getMinValue(): number | null {
    return getMinValue(this.root);
  }

  getMaxValue(): number | null {
    return getMaxValue(this.root);
  }
}
