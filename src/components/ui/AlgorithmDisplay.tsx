import React, { useState } from 'react';
import type { BSTStep } from '../../types';

interface AlgorithmDisplayProps {
  currentStep: BSTStep | null;
  operation: string;
}

// Algorithm pseudocode templates for each operation
const ALGORITHMS: Record<string, string[]> = {
  insert: [
    'if insertion point is found',
    '  create new vertex',
    '  if value to be inserted < this key',
    '    go left',
    '  else if value to be inserted > this key',
    '    go right',
    '  else increment frequency'
  ],
  search: [
    'if current vertex is null',
    '  return NOT_FOUND',
    'if value == current key',
    '  return FOUND',
    'if value < current key',
    '  go left',
    'else',
    '  go right'
  ],
  delete: [
    'search for vertex to delete',
    'if vertex has no children',
    '  remove vertex',
    'else if vertex has one child',
    '  bypass vertex',
    'else',
    '  find successor',
    '  replace with successor'
  ],
  traverse: [
    'if current vertex is null',
    '  return',
    'traverse left subtree',
    'visit current vertex',
    'traverse right subtree'
  ],
  successor: [
    'search for vertex',
    'if right subtree exists',
    '  find leftmost in right subtree',
    'else',
    '  find lowest ancestor'
  ],
  predecessor: [
    'search for vertex',
    'if left subtree exists',
    '  find rightmost in left subtree',
    'else',
    '  find lowest ancestor'
  ],
  min: [
    'start at root',
    'while left child exists',
    '  go left',
    'return current vertex'
  ],
  max: [
    'start at root',
    'while right child exists',
    '  go right',
    'return current vertex'
  ]
};

const AlgorithmDisplay: React.FC<AlgorithmDisplayProps> = ({ currentStep, operation }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const algorithm = ALGORITHMS[operation] || ALGORITHMS.insert;
  const currentLine = currentStep?.algorithmLine ?? -1;
  
  // Always show comparison box with contextual message
  const getComparisonMessage = (): string => {
    if (currentStep?.comparison) {
      return currentStep.comparison;
    }
    
    // Default messages when no step is active
    return 'Select an operation to begin visualization';
  };

  return (
    <div style={{ 
      position: 'absolute', 
      bottom: 0, 
      right: isCollapsed ? '-300px' : 0, 
      width: '300px', 
      zIndex: 15,
      transition: 'right 0.3s ease-in-out'
    }}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: 'absolute',
          left: '-30px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '30px',
          height: '60px',
          background: '#d65d7a',
          border: 'none',
          borderRadius: '5px 0 0 5px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          zIndex: 20
        }}
      >
        {isCollapsed ? '◀' : '▶'}
      </button>

      {/* Comparison Box (Cyan) - Always Visible */}
      <div style={{
        background: '#5bc0de',
        color: 'white',
        padding: '12px 15px',
        fontSize: '13px',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        minHeight: '45px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        {getComparisonMessage()}
      </div>

      {/* Algorithm Box (Pink) */}
      <div style={{
        background: '#d65d7a',
        color: 'white',
        padding: '15px',
        height: '180px',
        overflow: 'auto',
        fontSize: '12px',
        fontFamily: 'monospace',
        lineHeight: '1.6'
      }}>
        {algorithm.map((line, index) => (
          <div
            key={index}
            style={{
              background: currentLine === index ? '#000' : 'transparent',
              padding: '2px 5px',
              margin: '1px 0',
              transition: 'background 0.3s'
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmDisplay;
