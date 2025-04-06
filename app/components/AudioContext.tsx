import React from 'react';
import { useSynthVibeStore } from '../lib/store';

/**
 * AudioContext component that displays the audio status
 */
const AudioContext: React.FC = () => {
  const isAudioReady = useSynthVibeStore(state => state.isAudioReady);

  if (!isAudioReady) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 bg-black/50 border border-green-500/50 py-1 px-3 rounded text-xs text-green-300 neon-border">
      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
      <span className="neon-text">Audio Ready</span>
    </div>
  );
};

export default AudioContext;
