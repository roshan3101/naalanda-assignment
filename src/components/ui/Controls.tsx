import React, { useState } from 'react';

interface ControlsProps {
  onInsert: (val: number) => void;
  onSearch: (val: number) => void;
  onDelete: (val: number) => void;
  onSuccessor: (val: number) => void;
  onPredecessor: (val: number) => void;
  onInorder: () => void;
  onPreorder: () => void;
  onPostorder: () => void;
  onMin: () => void;
  onMax: () => void;
  isAnimating: boolean;
  treeMin: number | null;
  treeMax: number | null;
}

type Operation = 'insert' | 'search' | 'delete' | 'successor' | 'predecessor';
type InputMode = 'exact' | 'min' | 'max';

const Controls: React.FC<ControlsProps> = ({
  onInsert,
  onSearch,
  onDelete,
  onSuccessor,
  onPredecessor,
  onInorder,
  onPreorder,
  onPostorder,
  onMin,
  onMax,
  isAnimating,
  treeMin,
  treeMax
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedOp, setSelectedOp] = useState<Operation | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputMode, setInputMode] = useState<InputMode>('exact');

  // Auto-populate min/max values when mode changes
  React.useEffect(() => {
    if (inputMode === 'min' && treeMin !== null) {
      setInputValue(treeMin.toString());
    } else if (inputMode === 'max' && treeMax !== null) {
      setInputValue(treeMax.toString());
    }
  }, [inputMode, treeMin, treeMax]);

  const handleExecute = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return;

    switch (selectedOp) {
      case 'insert':
        onInsert(val);
        break;
      case 'search':
        onSearch(val);
        break;
      case 'delete':
        onDelete(val);
        break;
      case 'successor':
        onSuccessor(val);
        break;
      case 'predecessor':
        onPredecessor(val);
        break;
    }
    setInputValue('');
    setSelectedOp(null);
  };

  return (
    <div style={{
      position: 'relative',
      width: isCollapsed ? '0' : '200px',
      background: '#89c403',
      transition: 'width 0.3s ease-in-out',
      overflow: 'hidden',
      zIndex: 10
    }}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: 'absolute',
          right: '-30px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '30px',
          height: '60px',
          background: '#89c403',
          border: 'none',
          borderRadius: '0 5px 5px 0',
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
        {isCollapsed ? '▶' : '◀'}
      </button>

      {/* Sidebar Content */}
      <div style={{ padding: '10px 0', minWidth: '200px' }}>
        <div style={{ padding: '10px', fontWeight: 'bold', fontSize: '14px' }}>OPERATIONS</div>

        {/* Traversals */}
        <div style={{ padding: '5px 10px', fontSize: '11px', opacity: 0.8 }}>TRAVERSALS</div>
        <button onClick={onInorder} disabled={isAnimating}>Inorder</button>
        <button onClick={onPreorder} disabled={isAnimating}>Preorder</button>
        <button onClick={onPostorder} disabled={isAnimating}>Postorder</button>

        {/* Basic Operations */}
        <div style={{ padding: '5px 10px', fontSize: '11px', opacity: 0.8, marginTop: '10px' }}>BASIC</div>
        <button onClick={() => setSelectedOp('insert')} disabled={isAnimating}>Insert</button>
        <button onClick={() => setSelectedOp('search')} disabled={isAnimating}>Search</button>
        <button onClick={() => setSelectedOp('delete')} disabled={isAnimating}>Delete</button>

        {/* Min/Max */}
        <div style={{ padding: '5px 10px', fontSize: '11px', opacity: 0.8, marginTop: '10px' }}>MIN/MAX</div>
        <button onClick={onMin} disabled={isAnimating}>Find Min</button>
        <button onClick={onMax} disabled={isAnimating}>Find Max</button>

        {/* Successor/Predecessor */}
        <div style={{ padding: '5px 10px', fontSize: '11px', opacity: 0.8, marginTop: '10px' }}>ADVANCED</div>
        <button onClick={() => setSelectedOp('successor')} disabled={isAnimating}>Successor</button>
        <button onClick={() => setSelectedOp('predecessor')} disabled={isAnimating}>Predecessor</button>

        {/* Input Panel */}
        {selectedOp && (
          <div style={{ padding: '10px', marginTop: '15px', background: 'rgba(0,0,0,0.1)', borderRadius: '5px' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
              {selectedOp.toUpperCase()}
            </div>
            
            {/* Input Mode Selection */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
              <button
                onClick={() => setInputMode('exact')}
                style={{
                  flex: 1,
                  padding: '4px',
                  fontSize: '10px',
                  background: inputMode === 'exact' ? 'rgba(255,255,255,0.3)' : 'transparent'
                }}
              >
                Exact
              </button>
              <button
                onClick={() => setInputMode('min')}
                style={{
                  flex: 1,
                  padding: '4px',
                  fontSize: '10px',
                  background: inputMode === 'min' ? 'rgba(255,255,255,0.3)' : 'transparent'
                }}
                disabled={treeMin === null}
              >
                Min
              </button>
              <button
                onClick={() => setInputMode('max')}
                style={{
                  flex: 1,
                  padding: '4px',
                  fontSize: '10px',
                  background: inputMode === 'max' ? 'rgba(255,255,255,0.3)' : 'transparent'
                }}
                disabled={treeMax === null}
              >
                Max
              </button>
            </div>

            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '8px',
                border: 'none',
                borderRadius: '3px',
                fontSize: '13px'
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleExecute()}
            />
            
            <div style={{ display: 'flex', gap: '5px' }}>
              <button
                onClick={handleExecute}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: 'rgba(255,255,255,0.3)',
                  fontWeight: 'bold'
                }}
              >
                Execute
              </button>
              <button
                onClick={() => { setSelectedOp(null); setInputValue(''); }}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: 'rgba(0,0,0,0.2)'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;
