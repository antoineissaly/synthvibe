import { create } from 'zustand';

import { WaveformType, SegmentType } from '../utils/audioLoops';

// Define the store state interface
interface SynthVibeState {
  // Audio state
  isAudioReady: boolean;
  isPlaying: boolean;
  bpm: number;
  setAudioReady: (ready: boolean) => void;
  togglePlayback: () => void;
  setBpm: (bpm: number) => void;
  increaseBpm: () => void;
  decreaseBpm: () => void;
  
  // Track states
  tracks: {
    id: number;
    name: string;
    isActive: boolean;
    isMuted: boolean;
    isSolo: boolean;
    segment: SegmentType;
    waveform: WaveformType;
    timbre: number;
    mode: number;
    sweep: number;
  }[];
  
  // Track actions
  toggleTrack: (trackId: number) => void;
  muteTrack: (trackId: number) => void;
  soloTrack: (trackId: number) => void;
  setTrackSegment: (trackId: number, segment: SegmentType) => void;
  setTrackWaveform: (trackId: number, waveform: WaveformType) => void;
  setTrackTimbre: (trackId: number, value: number) => void;
  setTrackMode: (trackId: number, value: number) => void;
  setTrackSweep: (trackId: number, value: number) => void;
  
  // Control states
  buildUpActive: boolean;
  dropActive: boolean;
  
  // Control actions
  triggerBuildUp: () => void;
  triggerDrop: () => void;
}

// Create the store
export const useSynthVibeStore = create<SynthVibeState>((set) => ({
  // Initial audio state
  isAudioReady: false,
  isPlaying: false,
  bpm: 120,
  setAudioReady: (ready) => set({ isAudioReady: ready }),
  togglePlayback: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setBpm: (bpm) => set({ bpm }),
  increaseBpm: () => set((state) => ({ bpm: state.bpm + 1 })),
  decreaseBpm: () => set((state) => ({ bpm: Math.max(60, state.bpm - 1) })),
  
  // Initial tracks
  tracks: [
    { id: 1, name: 'Track 1', isActive: true, isMuted: false, isSolo: false, segment: 'A', waveform: 'sine', timbre: 50, mode: 50, sweep: 50 },
    { id: 2, name: 'Track 2', isActive: true, isMuted: false, isSolo: false, segment: 'A', waveform: 'sine', timbre: 50, mode: 50, sweep: 50 },
    { id: 3, name: 'Track 3', isActive: true, isMuted: false, isSolo: false, segment: 'A', waveform: 'sine', timbre: 50, mode: 50, sweep: 50 },
    { id: 4, name: 'Track 4', isActive: true, isMuted: false, isSolo: false, segment: 'A', waveform: 'sine', timbre: 50, mode: 50, sweep: 50 },
    { id: 5, name: 'Track 5', isActive: true, isMuted: false, isSolo: false, segment: 'A', waveform: 'sine', timbre: 50, mode: 50, sweep: 50 },
  ],
  
  // Track actions
  toggleTrack: (trackId) => set((state) => ({
    tracks: state.tracks.map(track => 
      track.id === trackId 
        ? { ...track, isActive: !track.isActive } 
        : track
    )
  })),
  
  muteTrack: (trackId) => set((state) => ({
    tracks: state.tracks.map(track => 
      track.id === trackId 
        ? { ...track, isMuted: !track.isMuted } 
        : track
    )
  })),
  
  soloTrack: (trackId) => set((state) => ({
    tracks: state.tracks.map(track => 
      track.id === trackId 
        ? { ...track, isSolo: !track.isSolo } 
        : track
    )
  })),
  
  setTrackSegment: (trackId, segment) => set((state) => ({
    tracks: state.tracks.map(track => 
      track.id === trackId 
        ? { ...track, segment } 
        : track
    )
  })),
  
  setTrackTimbre: (trackId, value) => set((state) => ({
    tracks: state.tracks.map(track => 
      track.id === trackId 
        ? { ...track, timbre: value } 
        : track
    )
  })),
  
  setTrackMode: (trackId, value) => set((state) => ({
    tracks: state.tracks.map(track => 
      track.id === trackId 
        ? { ...track, mode: value } 
        : track
    )
  })),
  
  setTrackSweep: (trackId, value) => set((state) => ({
    tracks: state.tracks.map(track => 
      track.id === trackId 
        ? { ...track, sweep: value } 
        : track
    )
  })),
  
  setTrackWaveform: (trackId, waveform) => set((state) => ({
    tracks: state.tracks.map(track => 
      track.id === trackId 
        ? { ...track, waveform } 
        : track
    )
  })),
  
  // Control states
  buildUpActive: false,
  dropActive: false,
  
  // Control actions
  triggerBuildUp: () => {
    console.log('Build Up triggered!');
    set({ buildUpActive: true, dropActive: false });
    // This will be implemented with actual Tone.js effects in later phases
  },
  
  triggerDrop: () => {
    console.log('Drop triggered!');
    set({ dropActive: true, buildUpActive: false });
    // This will be implemented with actual Tone.js effects in later phases
  }
}));
