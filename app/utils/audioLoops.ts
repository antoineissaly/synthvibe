import * as Tone from 'tone';
import { createLoop1 } from '../../public/audio/synths/loop1';
import { createLoop2 } from '../../public/audio/synths/loop2';
import { createLoop3 } from '../../public/audio/synths/loop3';
import { createLoop4 } from '../../public/audio/synths/loop4';
import { createLoop5 } from '../../public/audio/synths/loop5';

// Define the available waveform types
export type WaveformType = 'sine' | 'square' | 'sawtooth' | 'triangle';

// Define the available segments
export type SegmentType = 'A' | 'B' | 'C' | 'D' | 'E';

// Define segment display names
export const segmentNames = {
  'A': 'Frenzy',
  'B': 'Hotline',
  'C': 'Soundcore',
  'D': 'Batcave',
  'E': 'Vibes'
};

// Map of segment to loop creator function
const segmentLoopMap = {
  'A': createLoop1,
  'B': createLoop2,
  'C': createLoop3,
  'D': createLoop4,
  'E': createLoop5
};

/**
 * Create a buffer source from the specified loop
 * @param segment The segment to load
 * @returns A Tone.js buffer source
 */
export const createBufferSource = (segment: SegmentType = 'A'): Tone.ToneAudioBuffer => {
  try {
    console.log(`Creating buffer for segment ${segment}`);
    
    // Create an offline audio context to generate the buffer
    const offlineContext = new OfflineAudioContext(2, 44100 * 2, 44100);
    
    // Get the appropriate loop creator function
    const createLoopFn = segmentLoopMap[segment] || segmentLoopMap['A'];
    
    // Create the buffer
    const buffer = createLoopFn(offlineContext);
    
    // Log buffer details for debugging
    console.log(`Buffer created: channels=${buffer.numberOfChannels}, length=${buffer.length}, sample rate=${buffer.sampleRate}`);
    
    // Convert to Tone.js buffer
    const toneBuffer = new Tone.ToneAudioBuffer().fromArray(
      [buffer.getChannelData(0), buffer.getChannelData(1)]
    );
    
    console.log('Tone.js buffer created successfully');
    return toneBuffer;
  } catch (error) {
    console.error('Error creating buffer source:', error);
    
    // Create a fallback buffer with a simple sine wave
    console.log('Creating fallback buffer');
    const fallbackBuffer = new Tone.ToneAudioBuffer();
    const channels = 2;
    const length = 44100 * 2;
    const sampleRate = 44100;
    
    // Create an AudioBuffer to hold our audio data
    const audioBuffer = new AudioBuffer({ length, numberOfChannels: channels, sampleRate });
    
    for (let channel = 0; channel < channels; channel++) {
      const channelData = new Float32Array(length);
      for (let i = 0; i < length; i++) {
        // Simple sine wave at 440Hz
        channelData[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.5;
      }
      audioBuffer.copyToChannel(channelData, channel);
    }
    
    fallbackBuffer.fromArray([
      audioBuffer.getChannelData(0),
      audioBuffer.getChannelData(1)
    ]);
    
    return fallbackBuffer;
  }
};

/**
 * Create a player for the specified track
 * @param trackId The track ID
 * @param segment The segment to load
 * @returns A Tone.Player instance
 */
export const createTrackPlayer = (
  trackId: number,
  segment: SegmentType = 'A'
): Tone.Player => {
  try {
    console.log(`Creating player for track ${trackId} with segment ${segment}`);
    
    // Get the buffer for this segment
    const buffer = createBufferSource(segment);
    
    // Create a player with the buffer
    const player = new Tone.Player({
      loop: true,
      autostart: false,
      volume: -10, // Start at a reasonable volume
    }).toDestination();
    
    // Set the buffer
    player.buffer = buffer;
    
    // Apply waveform shaping based on segment
    const waveform = segment === 'A' ? 'sine' : 
                    segment === 'B' ? 'square' : 
                    segment === 'C' ? 'sawtooth' : 
                    segment === 'D' ? 'triangle' : 'sine';
    
    console.log(`Player created for track ${trackId} with waveform ${waveform}`);
    
    return player;
  } catch (error) {
    console.error(`Error creating player for track ${trackId}:`, error);
    
    // Create a fallback player with a simple oscillator
    console.log(`Creating fallback player for track ${trackId}`);
    const fallbackPlayer = new Tone.Player({
      loop: true,
      autostart: false,
      volume: -10,
    }).toDestination();
    
    // Create a simple buffer with a sine wave
    const fallbackBuffer = new Tone.ToneAudioBuffer();
    const channels = 2;
    const length = 44100 * 2;
    const sampleRate = 44100;
    
    const audioBuffer = new AudioBuffer({ length, numberOfChannels: channels, sampleRate });
    
    for (let channel = 0; channel < channels; channel++) {
      const channelData = new Float32Array(length);
      for (let i = 0; i < length; i++) {
        // Simple sine wave at 440Hz
        channelData[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.5;
      }
      audioBuffer.copyToChannel(channelData, channel);
    }
    
    fallbackBuffer.fromArray([
      audioBuffer.getChannelData(0),
      audioBuffer.getChannelData(1)
    ]);
    
    fallbackPlayer.buffer = fallbackBuffer;
    
    return fallbackPlayer;
  }
};

/**
 * Create a filter for the track
 * @param frequency Initial frequency
 * @returns A Tone.Filter instance
 */
export const createTrackFilter = (frequency: number = 5000): Tone.Filter => {
  return new Tone.Filter({
    type: 'lowpass',
    frequency,
    rolloff: -12
  });
};

/**
 * Map a value from one range to another
 * @param value The value to map
 * @param inMin The minimum input value
 * @param inMax The maximum input value
 * @param outMin The minimum output value
 * @param outMax The maximum output value
 * @returns The mapped value
 */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Convert a linear value (0-100) to a frequency value (20-20000)
 * @param value Linear value (0-100)
 * @returns Frequency value (20-20000)
 */
export const linearToFrequency = (value: number): number => {
  // Use an exponential mapping for more natural frequency control
  return Math.pow(10, mapRange(value, 0, 100, Math.log10(20), Math.log10(20000)));
};

/**
 * Convert a linear value (0-100) to a decibel value (-60-0)
 * @param value Linear value (0-100)
 * @returns Decibel value (-60-0)
 */
export const linearToDecibels = (value: number): number => {
  // Map 0-100 to -60-0 dB
  return mapRange(value, 0, 100, -60, 0);
};
