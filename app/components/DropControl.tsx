import React from 'react';
import { useSynthVibeStore } from '../lib/store';

/**
 * Control buttons for Build Up and Drop features
 */
const DropControl: React.FC = () => {
  const isAudioReady = useSynthVibeStore(state => state.isAudioReady);
  const buildUpActive = useSynthVibeStore(state => state.buildUpActive);
  const dropActive = useSynthVibeStore(state => state.dropActive);
  const triggerBuildUp = useSynthVibeStore(state => state.triggerBuildUp);
  const triggerDrop = useSynthVibeStore(state => state.triggerDrop);

  return (
    <div className="flex gap-4 justify-center">
      {/* BUILD UP Button */}
      <button 
        className={`w-24 h-24 rounded-full border-2 flex items-center justify-center font-bold text-sm
          ${buildUpActive 
            ? 'bg-green-100 border-green-500 text-green-700' 
            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
          }
          transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={!isAudioReady}
        onClick={triggerBuildUp}
      >
        BUILD UP
      </button>
      
      {/* DROP Button */}
      <button 
        className={`w-24 h-24 rounded-full border-2 flex items-center justify-center font-bold text-sm
          ${dropActive 
            ? 'bg-red-100 border-red-500 text-red-700' 
            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
          }
          transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={!isAudioReady}
        onClick={triggerDrop}
      >
        DROP
      </button>
    </div>
  );
};

export default DropControl;
