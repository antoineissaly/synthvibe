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
  const muteTrack = useSynthVibeStore(state => state.muteTrack);
  const soloTrack = useSynthVibeStore(state => state.soloTrack);
  
  if (!track) return null;
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 h-24 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium">{track.name}</h3>
        <div className="flex gap-2">
          <button 
            className={`${track.isMuted ? 'bg-red-600' : 'bg-purple-600 hover:bg-purple-700'} text-white px-2 py-1 rounded text-xs transition-colors`}
            onClick={() => muteTrack(track.id)}
          >
            {track.isMuted ? 'Unmute' : 'Mute'}
          </button>
          <button 
            className={`${track.isSolo ? 'bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-2 py-1 rounded text-xs transition-colors`}
            onClick={() => soloTrack(track.id)}
          >
            {track.isSolo ? 'Unsolo' : 'Solo'}
          </button>
        </div>
      </div>
      
      <div className="bg-gray-700 h-8 rounded relative">
        {/* This will be replaced with actual audio visualization/controls */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
          Audio Track Placeholder
        </div>
      </div>
    </div>
  );
};

export default Track;
