import React from 'react';
import { useSynthVibeStore } from '../lib/store';

/**
 * Top controls component for playback, BPM, and loop visualization
 */
const TopControls: React.FC = () => {
  const isAudioReady = useSynthVibeStore(state => state.isAudioReady);
  const isPlaying = useSynthVibeStore(state => state.isPlaying);
  const bpm = useSynthVibeStore(state => state.bpm);
  const togglePlayback = useSynthVibeStore(state => state.togglePlayback);
  const increaseBpm = useSynthVibeStore(state => state.increaseBpm);
  const decreaseBpm = useSynthVibeStore(state => state.decreaseBpm);

  return (
    <div className="flex items-center gap-4 mb-8">
      {/* Play Button */}
      <button 
        className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isAudioReady}
        onClick={togglePlayback}
      >
        <div className={`${isPlaying ? 'w-4 h-10 bg-gray-700' : 'w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-gray-700 ml-1'}`}>
          {isPlaying && <span className="sr-only">Pause</span>}
          {!isPlaying && <span className="sr-only">Play</span>}
        </div>
      </button>
      
      {/* BPM Controls */}
      <div className="border-2 border-gray-300 rounded-md p-2 flex flex-col items-center">
        <div className="text-gray-700 text-sm font-medium mb-1">BPM (tempo)</div>
        <div className="text-xl font-bold text-gray-800 mb-1">{bpm}</div>
        <div className="flex gap-2">
          <button 
            className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-gray-700"
            onClick={increaseBpm}
            aria-label="Increase BPM"
          />
          <button 
            className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-gray-700"
            onClick={decreaseBpm}
            aria-label="Decrease BPM"
          />
        </div>
      </div>
      
      {/* Loop Visualizer */}
      <div className="flex-1 border-2 border-gray-300 rounded-md h-24 flex items-center justify-center">
        <span className="text-gray-500">Loop visualizer</span>
      </div>
    </div>
  );
};

export default TopControls;
