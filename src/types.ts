export type AnimationAction = 'visit' | 'insert' | 'delete' | 'found' | 'not_found' | 'traverse' | 'compare';

export interface BSTStep {
  type: AnimationAction;
  nodeValue: number | null;
  description: string;
  algorithmLine?: number; // Line number to highlight in algorithm pseudocode
  comparison?: string; // Mathematical comparison to display (e.g., "93 > 82")
  highlightEdge?: { from: number; to: number }; // Edge to highlight during traversal
  nodeState?: 'appearing' | 'disappearing' | 'normal'; // For smooth node transitions
}

export interface PositionedNode {
  id: string;
  value: number;
  x: number;
  y: number;
  leftId: string | null;
  rightId: string | null;
}

export interface AnimationState {
  currentStepIndex: number;
  isPlaying: boolean;
  speed: number;
}
