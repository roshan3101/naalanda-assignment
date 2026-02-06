import React from 'react';

interface PlaybackControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSpeedChange: (speed: number) => void;
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  onPlay,
  onPause,
  onNext,
  onPrev,
  onSpeedChange,
  isPlaying,
  currentStep,
  totalSteps,
  speed
}) => {
  return (
    <div className="visu-bottom-bar">
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', width: '100%' }}>
        <div style={{ fontSize: '11px', minWidth: '30px' }}>
          {speed / 1000}x
        </div>
        
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={2100 - speed} // Reverse to make higher speed = faster
          onChange={(e) => onSpeedChange(2100 - parseInt(e.target.value))}
          style={{ width: '100px' }}
        />

        <div style={{ display: 'flex', gap: '15px', marginLeft: 'auto', marginRight: 'auto' }}>
          <button onClick={onPrev} disabled={currentStep <= -1}>⏮</button>
          {isPlaying ? (
            <button onClick={onPause}>⏸</button>
          ) : (
            <button onClick={onPlay} disabled={totalSteps === 0 || currentStep >= totalSteps - 1}>▶</button>
          )}
          <button onClick={onNext} disabled={currentStep >= totalSteps - 1}>⏭</button>
        </div>

        <div style={{ fontSize: '11px', display: 'flex', gap: '15px' }}>
          <span>About</span>
          <span>Team</span>
          <span>Privacy</span>
        </div>
      </div>
    </div>
  );
};

export default PlaybackControls;
