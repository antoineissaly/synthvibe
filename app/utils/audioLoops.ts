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
  // Create an offline audio context to generate the buffer
  const offlineContext = new OfflineAudioContext(2, 44100 * 2, 44100);
  
  // Get the appropriate loop creator function
  const createLoopFn = segmentLoopMap[segment] || segmentLoopMap['A'];
  
  // Create the buffer
  const buffer = createLoopFn(offlineContext);
  
  // Convert to Tone.js buffer
  return new Tone.ToneAudioBuffer().fromArray(
    [buffer.getChannelData(0), buffer.getChannelData(1)]
  );
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
  const buffer = createBufferSource(segment);
  
  const player = new Tone.Player({
    url: '',
    loop: true,
    autostart: false,
  }).toDestination();
  
  // Set the buffer
  player.buffer = buffer;
  
  return player;
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
