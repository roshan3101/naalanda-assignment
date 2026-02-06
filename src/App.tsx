import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { BST } from './core/bst';
import { calculateLayout } from './core/layout';
import { useAnimator } from './hooks/useAnimator';
import TreeCanvas from './components/tree/TreeCanvas';
import Controls from './components/ui/Controls';
import PlaybackControls from './components/ui/PlaybackControls';
import AlgorithmDisplay from './components/ui/AlgorithmDisplay';
import type { BSTStep } from './types';
import './index.css';

function App() {
  const bstRef = useRef(new BST());
  const [animationSteps, setAnimationSteps] = useState<BSTStep[]>([]);
  const [treeVersion, setTreeVersion] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 600 });
  const [currentOperation, setCurrentOperation] = useState<string>('insert');
  const [isInitialized, setIsInitialized] = useState(false);
  const [zoom, setZoom] = useState(1.0);

  // Initialize starter tree with ~25 nodes
  useEffect(() => {
    if (!isInitialized) {
      const starterValues = [50, 25, 75, 12, 37, 62, 87, 6, 18, 31, 43, 56, 68, 81, 93, 
                             3, 9, 15, 21, 28, 34, 40, 46, 53, 59];
      starterValues.forEach(val => {
        bstRef.current.insertSilent(val);
      });
      setTreeVersion(v => v + 1);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const handleStepChange = useCallback((step: BSTStep) => {
    if (step.type === 'insert' && step.nodeState === 'appearing') {
      bstRef.current.commitInsert(step.nodeValue!);
      setTreeVersion(v => v + 1);
    } else if (step.type === 'delete') {
      bstRef.current.commitDelete(step.nodeValue!);
      setTreeVersion(v => v + 1);
    }
  }, []);

  const {
    currentStep,
    currentStepIndex,
    isPlaying,
    speed,
    setSpeed,
    play,
    pause,
    next,
    prev,
    reset,
    totalSteps
  } = useAnimator(animationSteps, 800, handleStepChange);

  // Calculate tree statistics
  const treeStats = useMemo(() => ({
    height: bstRef.current.getHeight(),
    nodeCount: bstRef.current.getNodeCount(),
    min: bstRef.current.getMinValue(),
    max: bstRef.current.getMaxValue()
  }), [treeVersion]);

  // Auto-scale canvas based on tree size
  useEffect(() => {
    const baseWidth = 1000;
    const baseHeight = 600;
    const height = treeStats.height;
    
    // Scale up if tree is too tall
    const scaledHeight = Math.max(baseHeight, (height + 2) * 100);
    
    setCanvasSize({
      width: baseWidth,
      height: scaledHeight
    });
  }, [treeStats.height]);

  const nodes = useMemo(() => {
    return calculateLayout(bstRef.current.root, canvasSize.width, 80);
  }, [treeVersion, canvasSize.width]);

  const handleInsert = (val: number) => {
    setCurrentOperation('insert');
    const steps = bstRef.current.insert(val);
    setAnimationSteps(steps);
    reset();
    play();
  };

  const handleSearch = (val: number) => {
    setCurrentOperation('search');
    const steps = bstRef.current.search(val);
    setAnimationSteps(steps);
    reset();
    play();
  };

  const handleDelete = (val: number) => {
    setCurrentOperation('delete');
    const steps = bstRef.current.delete(val);
    setAnimationSteps(steps);
    reset();
    play();
  };

  const handleSuccessor = (val: number) => {
    setCurrentOperation('successor');
    const steps = bstRef.current.findSuccessor(val);
    setAnimationSteps(steps);
    reset();
    play();
  };

  const handlePredecessor = (val: number) => {
    setCurrentOperation('predecessor');
    const steps = bstRef.current.findPredecessor(val);
    setAnimationSteps(steps);
    reset();
    play();
  };

  const handleInorder = () => {
    setCurrentOperation('traverse');
    const steps = bstRef.current.inorderTraversal();
    setAnimationSteps(steps);
    reset();
    play();
  };

  const handlePreorder = () => {
    setCurrentOperation('traverse');
    const steps = bstRef.current.preorderTraversal();
    setAnimationSteps(steps);
    reset();
    play();
  };

  const handlePostorder = () => {
    setCurrentOperation('traverse');
    const steps = bstRef.current.postorderTraversal();
    setAnimationSteps(steps);
    reset();
    play();
  };

  const handleMin = () => {
    setCurrentOperation('min');
    const steps = bstRef.current.findMin();
    setAnimationSteps(steps);
    reset();
    play();
  };

  const handleMax = () => {
    setCurrentOperation('max');
    const steps = bstRef.current.findMax();
    setAnimationSteps(steps);
    reset();
    play();
  };

  return (
    <>
      <header className="visu-header">
        <div style={{ fontWeight: 'bold', fontSize: '16px', marginRight: '20px' }}>VISUALGO.NET</div>
        <div style={{ color: '#aaa', fontSize: '12px' }}>BINARY SEARCH TREE</div>
        
        {/* Tree Statistics */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '20px', fontSize: '12px', color: '#aaa' }}>
          <span>Nodes: <span style={{ color: '#fff', fontWeight: 'bold' }}>{treeStats.nodeCount}</span></span>
          <span>Height: <span style={{ color: '#fff', fontWeight: 'bold' }}>{treeStats.height}</span></span>
        </div>
      </header>

      <div className="app-container">
        <Controls
          onInsert={handleInsert}
          onSearch={handleSearch}
          onDelete={handleDelete}
          onSuccessor={handleSuccessor}
          onPredecessor={handlePredecessor}
          onInorder={handleInorder}
          onPreorder={handlePreorder}
          onPostorder={handlePostorder}
          onMin={handleMin}
          onMax={handleMax}
          isAnimating={isPlaying}
          treeMin={treeStats.min}
          treeMax={treeStats.max}
        />

        <main className="main-content">
          <TreeCanvas 
            nodes={nodes} 
            currentStep={currentStep} 
            canvasHeight={canvasSize.height} 
            zoom={zoom}
            onZoomChange={setZoom}
          />
          
          <AlgorithmDisplay currentStep={currentStep} operation={currentOperation} />
        </main>
      </div>

      <PlaybackControls
        onPlay={play}
        onPause={pause}
        onNext={next}
        onPrev={prev}
        onSpeedChange={setSpeed}
        isPlaying={isPlaying}
        currentStep={currentStepIndex}
        totalSteps={totalSteps}
        speed={speed}
      />
    </>
  );
}

export default App;
