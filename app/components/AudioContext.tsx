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
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded shadow transition-colors"
        >
          Enable Audio
        </button>
      ) : (
        <div className="flex items-center gap-1 bg-green-100 py-1 px-2 rounded text-xs text-green-800">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          <span>Audio Ready</span>
        </div>
      )}
    </>
  );
};

export default AudioContext;
