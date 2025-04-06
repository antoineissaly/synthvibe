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
    <div className="border border-purple-500/30 bg-black/30 rounded-lg p-4 mb-4 flex flex-col neon-border">
      <div className="flex items-center gap-4 mb-4">
        {/* ON Toggle */}
        <button 
          className={`w-20 h-16 flex items-center justify-center border rounded-md glow-effect
            ${track.isActive 
              ? 'bg-cyan-900/30 border-cyan-400/70 neon-border' 
              : 'bg-black/50 border-gray-500/50'}`}
          onClick={() => toggleTrack(track.id)}
        >
          <span className={`font-medium ${track.isActive ? 'text-cyan-300 neon-text' : 'text-gray-400'}`}>ON</span>
        </button>
        
        {/* Segment Selector */}
        <div className="w-40 h-16 border border-pink-500/50 bg-black/50 rounded-md flex items-center justify-center">
          <span className="text-pink-300">Segment</span>
        </div>
        
        {/* Waveform Visualizer */}
        <div className="flex-1 h-16 border border-purple-500/50 bg-black/50 rounded-md flex items-center justify-center">
          <span className="text-purple-300 text-sm">Waveform (see the waveform visually)</span>
        </div>
      </div>
      
      <div className="flex justify-between gap-4">
        {/* Timbre Slider */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-sm text-cyan-300 mb-1 neon-text">Timbre</span>
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
          <span className="text-sm text-pink-300 mb-1 neon-text">Mode</span>
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
          <span className="text-sm text-purple-300 mb-1 neon-text">Sweep</span>
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
