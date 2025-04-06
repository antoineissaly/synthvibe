import React from 'react';
import { useSynthVibeStore } from '../lib/store';

/**
 * Top controls component for playback, BPM, loop visualization, and effect buttons
 */
const TopControls: React.FC = () => {
  const isAudioReady = useSynthVibeStore(state => state.isAudioReady);
  const isPlaying = useSynthVibeStore(state => state.isPlaying);
  const bpm = useSynthVibeStore(state => state.bpm);
  const buildUpActive = useSynthVibeStore(state => state.buildUpActive);
  const dropActive = useSynthVibeStore(state => state.dropActive);
  const togglePlayback = useSynthVibeStore(state => state.togglePlayback);
  const increaseBpm = useSynthVibeStore(state => state.increaseBpm);
  const decreaseBpm = useSynthVibeStore(state => state.decreaseBpm);
  const triggerBuildUp = useSynthVibeStore(state => state.triggerBuildUp);
  const triggerDrop = useSynthVibeStore(state => state.triggerDrop);

  return (
    <div className="flex items-center gap-4 mb-8">
      {/* Play Button */}
      <button 
        className="w-24 h-24 rounded-full border-2 border-cyan-500/50 bg-black/50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed neon-border glow-effect"
        disabled={!isAudioReady}
        onClick={togglePlayback}
      >
        <div className={`${isPlaying 
          ? 'w-4 h-10 bg-cyan-400' 
          : 'w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-cyan-400 ml-1'}`}>
          {isPlaying && <span className="sr-only">Pause</span>}
          {!isPlaying && <span className="sr-only">Play</span>}
        </div>
      </button>
      
      {/* BPM Controls */}
      <div className="border-2 border-pink-500/50 bg-black/50 rounded-md p-2 flex flex-col items-center neon-border">
        <div className="text-pink-300 text-sm font-medium mb-1 neon-text">BPM (tempo)</div>
        <div className="text-xl font-bold text-white mb-1">{bpm}</div>
        <div className="flex gap-2">
          <button 
            className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-pink-400 glow-effect"
            onClick={increaseBpm}
            aria-label="Increase BPM"
          />
          <button 
            className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-pink-400 glow-effect"
            onClick={decreaseBpm}
            aria-label="Decrease BPM"
          />
        </div>
      </div>
      
      {/* Loop Visualizer */}
      <div className="flex-1 border-2 border-purple-500/50 bg-black/50 rounded-md h-24 flex items-center justify-center neon-border">
        <span className="text-purple-300 neon-text">Loop visualizer</span>
      </div>
      
      {/* BUILD UP Button */}
      <button 
        className={`w-24 h-24 rounded-full border-2 flex items-center justify-center font-bold text-sm glow-effect
          ${buildUpActive 
            ? 'bg-green-900/50 border-green-400 text-green-300 neon-border' 
            : 'bg-black/50 border-cyan-500/50 text-cyan-300 hover:border-cyan-400'
          }
          transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={!isAudioReady}
        onClick={triggerBuildUp}
      >
        <span className={buildUpActive ? 'neon-text' : ''}>BUILD UP</span>
      </button>
      
      {/* DROP Button */}
      <button 
        className={`w-24 h-24 rounded-full border-2 flex items-center justify-center font-bold text-sm glow-effect
          ${dropActive 
            ? 'bg-red-900/50 border-red-400 text-red-300 neon-border' 
            : 'bg-black/50 border-pink-500/50 text-pink-300 hover:border-pink-400'
          }
          transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={!isAudioReady}
        onClick={triggerDrop}
      >
        <span className={dropActive ? 'neon-text' : ''}>DROP</span>
      </button>
    </div>
  );
};

export default TopControls;
