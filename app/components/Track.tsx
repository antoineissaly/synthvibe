import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { useSynthVibeStore } from '../lib/store';
import { 
  createTrackPlayer, 
  createTrackFilter, 
  linearToFrequency, 
  linearToDecibels,
  WaveformType,
  SegmentType,
  segmentNames
} from '../utils/audioLoops';
import SegmentModal from './SegmentModal';

interface TrackProps {
  trackNumber: number;
}

/**
 * Track component representing a single audio track in the synthwave application
 */
const Track: React.FC<TrackProps> = ({ trackNumber }) => {
  // Get track state from the store
  const track = useSynthVibeStore(state => 
    state.tracks.find(t => t.id === trackNumber)
  );
  const isPlaying = useSynthVibeStore(state => state.isPlaying);
  const isAudioReady = useSynthVibeStore(state => state.isAudioReady);
  
  // Get track actions from the store
  const toggleTrack = useSynthVibeStore(state => state.toggleTrack);
  const setTrackSegment = useSynthVibeStore(state => state.setTrackSegment);
  const setTrackWaveform = useSynthVibeStore(state => state.setTrackWaveform);
  const setTrackTimbre = useSynthVibeStore(state => state.setTrackTimbre);
  const setTrackMode = useSynthVibeStore(state => state.setTrackMode);
  const setTrackSweep = useSynthVibeStore(state => state.setTrackSweep);
  
  // Refs to store Tone.js objects
  const playerRef = useRef<Tone.Player | null>(null);
  const filterRef = useRef<Tone.Filter | null>(null);
  
  // Local state for visualizing audio and UI
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Initialize audio for this track
  useEffect(() => {
    if (!track || !isAudioReady) return;
    
    // Create player and filter
    const player = createTrackPlayer(trackNumber, track.segment as SegmentType);
    const filter = createTrackFilter(linearToFrequency(track.timbre));
    
    // Connect player -> filter -> destination
    player.disconnect();
    player.connect(filter);
    filter.toDestination();
    
    // Set volume
    player.volume.value = linearToDecibels(track.sweep);
    
    // Store refs
    playerRef.current = player;
    filterRef.current = filter;
    
    // Set loaded state
    setIsLoaded(true);
    
    // Cleanup function
    return () => {
      player.stop();
      player.dispose();
      filter.dispose();
      playerRef.current = null;
      filterRef.current = null;
    };
  }, [isAudioReady, track, trackNumber]);
  
  // Handle playback state changes
  useEffect(() => {
    if (!playerRef.current || !isLoaded || !track) return;
    
    if (isPlaying && track.isActive && !track.isMuted) {
      playerRef.current.start();
    } else {
      playerRef.current.stop();
    }
  }, [isPlaying, track, isLoaded]);
  
  // Handle filter (timbre) changes
  useEffect(() => {
    if (!filterRef.current || !track) return;
    filterRef.current.frequency.value = linearToFrequency(track.timbre);
  }, [track]);
  
  // Handle volume (sweep) changes
  useEffect(() => {
    if (!playerRef.current || !track) return;
    playerRef.current.volume.value = linearToDecibels(track.sweep);
  }, [track]);
  
  if (!track) return null;
  
  // Available waveform types
  const waveformTypes: WaveformType[] = ['sine', 'square', 'sawtooth', 'triangle'];
  
  // Handle segment selection
  const handleSelectSegment = (segment: string) => {
    setTrackSegment(track.id, segment as SegmentType);
  };
  
  // Handle opening the segment modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  // Handle closing the segment modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
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
          disabled={!isAudioReady}
        >
          <span className={`font-medium ${track.isActive ? 'text-cyan-300 neon-text' : 'text-gray-400'}`}>ON</span>
        </button>
        
        {/* Segment Selector Button */}
        <button 
          className={`w-40 h-16 border border-pink-500/50 bg-black/50 rounded-md flex items-center justify-center
            ${track.segment ? 'text-pink-300 hover:bg-pink-900/30' : 'text-gray-400'}
            ${track.segment ? 'border-pink-500/70' : 'border-pink-500/30'}`}
          onClick={handleOpenModal}
          disabled={!isAudioReady}
        >
          <span className={track.segment ? 'neon-text' : ''}>
            {track.segment ? segmentNames[track.segment] : 'Select Segment'}
          </span>
        </button>
        
        {/* Segment Selection Modal */}
        <SegmentModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSelectSegment={handleSelectSegment}
          currentSegment={track.segment as SegmentType}
        />
        
        {/* Waveform Selector */}
        <div className="flex-1 h-16 border border-purple-500/50 bg-black/50 rounded-md flex items-center justify-center gap-2">
          {waveformTypes.map(type => (
            <button
              key={type}
              className={`px-3 py-1 rounded ${track.waveform === type 
                ? 'bg-purple-900 text-purple-200 neon-text' 
                : 'bg-black/30 text-purple-300 hover:bg-purple-900/30'}`}
              onClick={() => setTrackWaveform(track.id, type)}
              disabled={!isAudioReady}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between gap-4">
        {/* Timbre Slider (Filter Cutoff) */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-sm text-cyan-300 mb-1 neon-text">Timbre</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={track.timbre}
            onChange={(e) => setTrackTimbre(track.id, Number(e.target.value))}
            className="w-full"
            disabled={!isAudioReady}
          />
        </div>
        
        {/* Mode Slider */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-sm text-pink-300 mb-1 neon-text">Mode</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={track.mode}
            onChange={(e) => setTrackMode(track.id, Number(e.target.value))}
            className="w-full"
            disabled={!isAudioReady}
          />
        </div>
        
        {/* Sweep Slider (Volume) */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-sm text-purple-300 mb-1 neon-text">Sweep</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={track.sweep}
            onChange={(e) => setTrackSweep(track.id, Number(e.target.value))}
            className="w-full"
            disabled={!isAudioReady}
          />
        </div>
      </div>
    </div>
  );
};

export default Track;
