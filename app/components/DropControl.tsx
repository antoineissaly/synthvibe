import React from 'react';
import { useSynthVibeStore } from '../lib/store';

/**
 * DropControl component for the synthwave "Drop" feature
 * This will allow users to trigger dramatic audio transitions
 */
const DropControl: React.FC = () => {
  const isAudioReady = useSynthVibeStore(state => state.isAudioReady);
  const dropIntensity = useSynthVibeStore(state => state.dropIntensity);
  const dropEffect = useSynthVibeStore(state => state.dropEffect);
  const setDropIntensity = useSynthVibeStore(state => state.setDropIntensity);
  const setDropEffect = useSynthVibeStore(state => state.setDropEffect);
  const triggerDrop = useSynthVibeStore(state => state.triggerDrop);

  return (
    <div className="bg-gradient-to-r from-purple-900 to-pink-700 rounded-lg p-6 flex flex-col items-center">
      <h2 className="text-white text-xl font-bold mb-4">Drop Control</h2>
      
      <button 
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isAudioReady} // Disabled until audio is ready
        onClick={triggerDrop}
      >
        DROP
      </button>
      
      <div className="mt-4 w-full grid grid-cols-2 gap-3">
        <div className="bg-black/30 rounded p-2">
          <label className="text-white text-xs block mb-1">Intensity</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={dropIntensity}
            onChange={(e) => setDropIntensity(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="bg-black/30 rounded p-2">
          <label className="text-white text-xs block mb-1">Effect</label>
          <select 
            className="w-full bg-gray-800 text-white text-sm p-1 rounded"
            value={dropEffect}
            onChange={(e) => setDropEffect(e.target.value)}
          >
            <option value="Filter Sweep">Filter Sweep</option>
            <option value="Reverb Blast">Reverb Blast</option>
            <option value="Pitch Drop">Pitch Drop</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DropControl;
