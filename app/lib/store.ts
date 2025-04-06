import { create } from 'zustand';

// Define the store state interface
interface SynthVibeState {
  // Audio state
  isAudioReady: boolean;
  setAudioReady: (ready: boolean) => void;
  
  // Track states
  tracks: {
    id: number;
    name: string;
    isMuted: boolean;
    isSolo: boolean;
  }[];
  
  // Track actions
  muteTrack: (trackId: number) => void;
  soloTrack: (trackId: number) => void;
  
  // Drop control state
  dropIntensity: number;
  dropEffect: string;
  setDropIntensity: (intensity: number) => void;
  setDropEffect: (effect: string) => void;
  
  // Drop action
  triggerDrop: () => void;
}

// Create the store
export const useSynthVibeStore = create<SynthVibeState>((set) => ({
  // Initial audio state
  isAudioReady: false,
  setAudioReady: (ready) => set({ isAudioReady: ready }),
  
  // Initial tracks
  tracks: [
    { id: 1, name: 'Track 1', isMuted: false, isSolo: false },
    { id: 2, name: 'Track 2', isMuted: false, isSolo: false },
    { id: 3, name: 'Track 3', isMuted: false, isSolo: false },
    { id: 4, name: 'Track 4', isMuted: false, isSolo: false },
    { id: 5, name: 'Track 5', isMuted: false, isSolo: false },
  ],
  
  // Track actions
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
  
  // Initial drop control state
  dropIntensity: 50,
  dropEffect: 'Filter Sweep',
  setDropIntensity: (intensity) => set({ dropIntensity: intensity }),
  setDropEffect: (effect) => set({ dropEffect: effect }),
  
  // Drop action (placeholder for now)
  triggerDrop: () => {
    console.log('Drop triggered!');
    // This will be implemented with actual Tone.js effects in later phases
  }
}));
