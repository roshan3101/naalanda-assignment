import React from 'react';
import type { AnimationAction } from '../../types';

interface TreeNodeProps {
  x: number;
  y: number;
  value: number;
  isActive: boolean;
  actionType: AnimationAction | null;
  nodeState?: 'appearing' | 'disappearing' | 'normal';
}

const TreeNode: React.FC<TreeNodeProps> = ({ 
  x, y, value, isActive, actionType, nodeState = 'normal' 
}) => {
  let color = '#fff';
  let stroke = '#333';
  let strokeWidth = 2;
  let opacity = 1;
  let scale = 1;

  // Handle node state animations
  if (nodeState === 'appearing') {
    opacity = 0.3;
    scale = 0.5;
  } else if (nodeState === 'disappearing') {
    opacity = 0.3;
    scale = 0.5;
  }

  if (isActive) {
    strokeWidth = 4;
    scale = 1.1; // Slight pulse effect for active nodes
    
    switch (actionType) {
      case 'visit':
      case 'compare':
        stroke = '#3498db'; // Blue
        break;
      case 'insert':
      case 'found':
        stroke = '#2ecc71'; // Green
        break;
      case 'delete':
      case 'not_found':
        stroke = '#e74c3c'; // Red
        break;
      case 'traverse':
        stroke = '#f1c40f'; // Yellow
        break;
      default:
        stroke = '#3498db';
    }
  }

  return (
    <g 
      className="tree-node" 
      style={{ 
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transformOrigin: `${x}px ${y}px`
      }}
      opacity={opacity}
      transform={`scale(${scale})`}
    >
      <circle
        cx={x}
        cy={y}
        r={25}
        fill={color}
        stroke={stroke}
        strokeWidth={strokeWidth}
        style={{ 
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          filter: isActive ? 'drop-shadow(0 0 8px currentColor)' : 'none'
        }}
      />
      <text
        x={x}
        y={y}
        dy=".35em"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="#333"
        style={{ 
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {value}
      </text>
    </g>
  );
};

export default TreeNode;
