import { useState, useCallback, useEffect } from 'react';
import * as Tone from 'tone';

/**
 * Custom hook to handle Tone.js audio context initialization
 * 
 * @returns {Object} Object containing audio state and control functions
 */
export const useToneSetup = () => {
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);

  // Initialize Tone.js when the component mounts
  useEffect(() => {
    // Check if the audio context is already running
    if (Tone.context.state === 'running') {
      setIsAudioReady(true);
      setIsAudioStarted(true);
    }
  }, []);

  // Function to start the audio context
  const startAudio = useCallback(async () => {
    try {
      // This must be called in response to a user interaction (click, tap, etc.)
      await Tone.start();
      console.log('Audio context started');
      setIsAudioStarted(true);
      setIsAudioReady(true);
    } catch (error) {
      console.error('Failed to start audio context:', error);
    }
  }, []);

  return {
    isAudioStarted,
    isAudioReady,
    startAudio
  };
};
