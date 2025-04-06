import React, { useEffect } from 'react';
import { useToneSetup } from '../hooks/useToneSetup';
import { useSynthVibeStore } from '../lib/store';

/**
 * AudioContext component that provides a button to initialize the Tone.js audio context
 * This is necessary because browsers require user interaction to start audio
 */
const AudioContext: React.FC = () => {
  const { isAudioStarted, isAudioReady, startAudio } = useToneSetup();
  const setAudioReady = useSynthVibeStore(state => state.setAudioReady);
  
  // Update the global store when audio is ready
  useEffect(() => {
    setAudioReady(isAudioReady);
  }, [isAudioReady, setAudioReady]);

  return (
    <>
      {!isAudioStarted ? (
        <button
          onClick={startAudio}
          className="bg-pink-600 hover:bg-pink-700 text-white text-xs py-1 px-3 rounded shadow-lg transition-colors glow-effect"
        >
          Enable Audio
        </button>
      ) : (
        <div className="flex items-center gap-1 bg-black/50 border border-green-500/50 py-1 px-3 rounded text-xs text-green-300 neon-border">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          <span className="neon-text">Audio Ready</span>
        </div>
      )}
    </>
  );
};

export default AudioContext;
