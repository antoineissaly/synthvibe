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
    <div className="fixed top-4 right-4 z-50">
      {!isAudioStarted ? (
        <button
          onClick={startAudio}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-colors"
        >
          Start Audio
        </button>
      ) : (
        <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 py-1 px-3 rounded-full text-sm text-green-800 dark:text-green-200">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Audio Ready
        </div>
      )}
    </div>
  );
};

export default AudioContext;
