import React from 'react';
import type { PositionedNode, BSTStep } from '../../types';
import TreeNode from './TreeNode';

interface TreeCanvasProps {
  nodes: PositionedNode[];
  currentStep: BSTStep | null;
  canvasHeight?: number;
  zoom?: number;
  onZoomChange?: (newZoom: number) => void;
}

const TreeCanvas: React.FC<TreeCanvasProps> = ({ 
  nodes, 
  currentStep, 
  canvasHeight = 600,
  zoom = 1.0,
  onZoomChange
}) => {
  // Check if an edge should be highlighted
  const isEdgeHighlighted = (fromValue: number, toValue: number): boolean => {
    if (!currentStep?.highlightEdge) return false;
    const { from, to } = currentStep.highlightEdge;
    return (from === fromValue && to === toValue);
  };

  const handleZoomIn = () => {
    if (onZoomChange) onZoomChange(Math.min(zoom + 0.1, 3.0));
  };

  const handleZoomOut = () => {
    if (onZoomChange) onZoomChange(Math.max(zoom - 0.1, 0.2));
  };

  const handleZoomReset = () => {
    if (onZoomChange) onZoomChange(1.0);
  };

  const viewWidth = 1000 / zoom;
  const viewHeight = canvasHeight / zoom;
  const viewX = (1000 - viewWidth) / 2;
  const viewY = 0; // Keep top aligned

  return (
    <div className="tree-canvas-container" style={{ position: 'relative' }}>
      {/* Zoom Controls */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        zIndex: 10
      }}>
        <button 
          onClick={handleZoomIn}
          style={{
            width: '30px',
            height: '30px',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            padding: 0,
            color: '#333'
          }}
          title="Zoom In"
        >+</button>
        <button 
          onClick={handleZoomOut}
          style={{
            width: '30px',
            height: '30px',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            padding: 0,
            color: '#333'
          }}
          title="Zoom Out"
        >-</button>
        <button 
          onClick={handleZoomReset}
          style={{
            width: '30px',
            height: '30px',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            padding: 0,
            color: '#333'
          }}
          title="Reset Zoom"
        >1:1</button>
      </div>

      <svg 
        width="100%" 
        height="100%" 
        style={{ display: 'block' }}
        viewBox={`${viewX} ${viewY} ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMidYMin meet"
      >
        {/* Edges layer */}
        <g className="edges">
          {nodes.map((node) => {
            const leftChild = nodes.find((n) => n.id === node.leftId);
            const rightChild = nodes.find((n) => n.id === node.rightId);

            return (
              <React.Fragment key={node.id}>
                {leftChild && (
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={leftChild.x}
                    y2={leftChild.y}
                    stroke={isEdgeHighlighted(node.value, leftChild.value) ? '#f39c12' : '#555'}
                    strokeWidth={isEdgeHighlighted(node.value, leftChild.value) ? '4' : '2'}
                    style={{ 
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      opacity: isEdgeHighlighted(node.value, leftChild.value) ? 1 : 0.6
                    }}
                  />
                )}
                {rightChild && (
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={rightChild.x}
                    y2={rightChild.y}
                    stroke={isEdgeHighlighted(node.value, rightChild.value) ? '#f39c12' : '#555'}
                    strokeWidth={isEdgeHighlighted(node.value, rightChild.value) ? '4' : '2'}
                    style={{ 
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      opacity: isEdgeHighlighted(node.value, rightChild.value) ? 1 : 0.6
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </g>

        {/* Nodes layer */}
        <g className="nodes">
          {nodes.map((node) => {
            const isActive = currentStep?.nodeValue === node.value;
            const nodeState = isActive ? currentStep?.nodeState : 'normal';
            
            return (
              <TreeNode
                key={node.id}
                x={node.x}
                y={node.y}
                value={node.value}
                isActive={isActive}
                actionType={currentStep?.type ?? null}
                nodeState={nodeState}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default TreeCanvas;
