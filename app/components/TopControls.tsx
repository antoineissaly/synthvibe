import React, { useEffect, useState, useRef } from 'react';
import * as Tone from 'tone';
import { useSynthVibeStore } from '../lib/store';
import { executeBuildUp, executeDrop, resetDropEffects } from '../utils/dropEffects';

/**
 * Top controls component for playback, BPM, loop visualization, and effect buttons
 */
const TopControls: React.FC = () => {
  const isAudioReady = useSynthVibeStore(state => state.isAudioReady);
  const isPlaying = useSynthVibeStore(state => state.isPlaying);
  const bpm = useSynthVibeStore(state => state.bpm);
  const buildUpActive = useSynthVibeStore(state => state.buildUpActive);
  const dropActive = useSynthVibeStore(state => state.dropActive);
  const buildUpProgress = useSynthVibeStore(state => state.buildUpProgress);
  const isDropReady = useSynthVibeStore(state => state.isDropReady);
  const togglePlayback = useSynthVibeStore(state => state.togglePlayback);
  const increaseBpm = useSynthVibeStore(state => state.increaseBpm);
  const decreaseBpm = useSynthVibeStore(state => state.decreaseBpm);
  const triggerBuildUp = useSynthVibeStore(state => state.triggerBuildUp);
  const triggerDrop = useSynthVibeStore(state => state.triggerDrop);
  const updateBuildUpProgress = useSynthVibeStore(state => state.updateBuildUpProgress);

  // Connect playback state to Tone.js transport
  useEffect(() => {
    if (!isAudioReady) return;
    
    if (isPlaying) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
  }, [isPlaying, isAudioReady]);
  
  // Connect BPM to Tone.js transport
  useEffect(() => {
    if (!isAudioReady) return;
    Tone.Transport.bpm.value = bpm;
  }, [bpm, isAudioReady]);
  
  // Execute build-up effects
  useEffect(() => {
    if (buildUpActive) {
      executeBuildUp(buildUpProgress);
      
      // Manual progress update for testing
      const manualProgressInterval = setInterval(() => {
        updateBuildUpProgress(Math.min(buildUpProgress + 1, 100));
      }, 50);
      
      return () => {
        clearInterval(manualProgressInterval);
      };
    } else {
      resetDropEffects();
    }
  }, [buildUpActive, buildUpProgress, updateBuildUpProgress]);
  
  // Execute drop effects
  useEffect(() => {
    if (dropActive) {
      executeDrop();
    }
  }, [dropActive]);
  
  // Get startAudioContext from the store
  const startAudioContext = useSynthVibeStore(state => state.startAudioContext);
  
  // Handle playback toggle
  const handlePlaybackToggle = async () => {
    // If audio is not ready, initialize it first
    if (!isAudioReady) {
      await startAudioContext();
    }
    
    // Toggle playback
    togglePlayback();
  };
  
  // State for tracking button press
  const [isIncreasePressed, setIsIncreasePressed] = useState(false);
  const [isDecreasePressed, setIsDecreasePressed] = useState(false);
  const increaseBpmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const decreaseBpmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle BPM changes with long press support
  const handleIncreaseBpmStart = () => {
    setIsIncreasePressed(true);
    increaseBpm(); // Immediate first increase
    
    // Start interval for continuous increase while pressed
    increaseBpmIntervalRef.current = setInterval(() => {
      increaseBpm();
    }, 150); // Adjust speed as needed
  };
  
  const handleIncreaseBpmEnd = () => {
    setIsIncreasePressed(false);
    if (increaseBpmIntervalRef.current) {
      clearInterval(increaseBpmIntervalRef.current);
      increaseBpmIntervalRef.current = null;
    }
  };
  
  const handleDecreaseBpmStart = () => {
    setIsDecreasePressed(true);
    decreaseBpm(); // Immediate first decrease
    
    // Start interval for continuous decrease while pressed
    decreaseBpmIntervalRef.current = setInterval(() => {
      decreaseBpm();
    }, 150); // Adjust speed as needed
  };
  
  const handleDecreaseBpmEnd = () => {
    setIsDecreasePressed(false);
    if (decreaseBpmIntervalRef.current) {
      clearInterval(decreaseBpmIntervalRef.current);
      decreaseBpmIntervalRef.current = null;
    }
  };
  
  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      if (increaseBpmIntervalRef.current) {
        clearInterval(increaseBpmIntervalRef.current);
      }
      if (decreaseBpmIntervalRef.current) {
        clearInterval(decreaseBpmIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-4 mb-8">
      {/* Play Button */}
      <button 
        className="w-24 h-24 rounded-full border-2 border-cyan-500/50 bg-black/50 flex items-center justify-center neon-border glow-effect"
        onClick={handlePlaybackToggle}
      >
        {isPlaying ? (
          // Pause icon - two vertical bars
          <div className="flex gap-2">
            <div className="w-4 h-12 bg-cyan-400"></div>
            <div className="w-4 h-12 bg-cyan-400"></div>
            <span className="sr-only">Pause</span>
          </div>
        ) : (
          // Play icon - larger triangle
          <div className="w-0 h-0 border-t-[24px] border-b-[24px] border-l-[36px] border-t-transparent border-b-transparent border-l-cyan-400 ml-2">
            <span className="sr-only">Play</span>
          </div>
        )}
      </button>
      
      {/* BPM Controls */}
      <div className="border-2 border-pink-500/50 bg-black/50 rounded-md p-2 flex flex-col items-center neon-border">
        <div className="text-pink-300 text-sm font-medium mb-1 neon-text">BPM (tempo)</div>
        <div className="text-xl font-bold text-white mb-1">{bpm}</div>
        <div className="flex gap-2">
          <button 
            className={`w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-pink-400 glow-effect ${isIncreasePressed ? 'opacity-70' : ''}`}
            onMouseDown={handleIncreaseBpmStart}
            onMouseUp={handleIncreaseBpmEnd}
            onMouseLeave={handleIncreaseBpmEnd}
            onTouchStart={handleIncreaseBpmStart}
            onTouchEnd={handleIncreaseBpmEnd}
            aria-label="Increase BPM"
          />
          <button 
            className={`w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-pink-400 glow-effect ${isDecreasePressed ? 'opacity-70' : ''}`}
            onMouseDown={handleDecreaseBpmStart}
            onMouseUp={handleDecreaseBpmEnd}
            onMouseLeave={handleDecreaseBpmEnd}
            onTouchStart={handleDecreaseBpmStart}
            onTouchEnd={handleDecreaseBpmEnd}
            aria-label="Decrease BPM"
          />
        </div>
      </div>
      
      {/* Loop Visualizer with Build-up Progress */}
      <div className="flex-1 border-2 border-purple-500/50 bg-black/50 rounded-md h-24 flex flex-col items-center justify-center neon-border relative overflow-hidden">
        {buildUpActive && (
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-pink-500" 
               style={{ width: `${buildUpProgress}%` }}></div>
        )}
        
        {/* Screen flash effect for drop */}
        {dropActive && (
          <div className="absolute inset-0 bg-white/30 animate-flash"></div>
        )}
        
        <span className="text-purple-300 neon-text">Loop visualizer</span>
        
        {buildUpActive && (
          <div className="mt-2 text-xs text-cyan-300">
            Build-up: {buildUpProgress}%
          </div>
        )}
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
            : isDropReady
              ? 'bg-pink-900/30 border-pink-400 text-pink-300 hover:border-pink-400 animate-pulse'
              : 'bg-black/50 border-pink-500/50 text-pink-300 hover:border-pink-400'
          }
          transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={!isAudioReady || (!isDropReady && !dropActive)}
        onClick={triggerDrop}
      >
        <span className={dropActive || isDropReady ? 'neon-text' : ''}>DROP</span>
      </button>
    </div>
  );
};

export default TopControls;
