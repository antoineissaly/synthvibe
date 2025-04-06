import React from 'react';
import { useSynthVibeStore } from '../lib/store';

interface TrackProps {
  trackNumber: number;
}

/**
 * Track component representing a single audio track in the synthwave application
 */
const Track: React.FC<TrackProps> = ({ trackNumber }) => {
  const track = useSynthVibeStore(state => 
    state.tracks.find(t => t.id === trackNumber)
  );
  const toggleTrack = useSynthVibeStore(state => state.toggleTrack);
  
  if (!track) return null;
  
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        {/* ON Toggle */}
        <button 
          className={`w-20 h-16 flex items-center justify-center border ${track.isActive ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'} rounded-md`}
          onClick={() => toggleTrack(track.id)}
        >
          <span className={`font-medium ${track.isActive ? 'text-green-700' : 'text-gray-500'}`}>ON</span>
        </button>
        
        {/* Segment Selector */}
        <div className="w-40 h-16 border border-gray-300 rounded-md flex items-center justify-center">
          <span className="text-gray-700">Segment</span>
        </div>
        
        {/* Waveform Visualizer */}
        <div className="flex-1 h-16 border border-gray-300 rounded-md flex items-center justify-center">
          <span className="text-gray-500 text-sm">Waveform (see the waveform visually)</span>
        </div>
      </div>
      
      <div className="flex justify-between gap-4">
        {/* Timbre Slider */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-sm text-gray-700 mb-1">Timbre</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            defaultValue="50"
            className="w-full"
          />
        </div>
        
        {/* Mode Slider */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-sm text-gray-700 mb-1">Mode</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            defaultValue="50"
            className="w-full"
          />
        </div>
        
        {/* Sweep Slider */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-sm text-gray-700 mb-1">Sweep</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            defaultValue="50"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Track;
