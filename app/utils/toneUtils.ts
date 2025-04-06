import * as Tone from 'tone';

/**
 * Utility functions for working with Tone.js
 * These will be expanded in future phases of the project
 */

/**
 * Create an analyzer for visualizing audio waveforms
 * @param fftSize The FFT size for the analyzer (must be a power of 2)
 * @returns A Tone.js analyzer instance
 */
export const createWaveformAnalyzer = (fftSize: number = 1024) => {
  // Create a waveform analyzer
  const analyzer = new Tone.Analyser({
    type: 'waveform',
    size: fftSize
  });
  
  // Connect the master output to the analyzer
  Tone.Destination.connect(analyzer);
  
  return analyzer;
};

/**
 * Create a basic synth with synthwave-like settings
 * @returns A Tone.js synth instance
 */
export const createSynthwaveSynth = () => {
  return new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: 'sawtooth'
    },
    envelope: {
      attack: 0.05,
      decay: 0.2,
      sustain: 0.6,
      release: 1.5
    }
  }).toDestination();
};

/**
 * Create a basic drum machine
 * @returns A Tone.js sampler instance
 */
export const createDrumMachine = () => {
  // This is a placeholder - in future phases, we'll load actual drum samples
  return new Tone.MembraneSynth().toDestination();
};

/**
 * Apply a synthwave-style reverb effect to a Tone.js instrument
 * @param instrument The Tone.js instrument to process
 * @returns The processed instrument with reverb
 */
export const addSynthwaveReverb = (instrument: Tone.ToneAudioNode) => {
  const reverb = new Tone.Reverb({
    decay: 4,
    wet: 0.3
  }).toDestination();
  
  instrument.disconnect();
  instrument.connect(reverb);
  
  return instrument;
};

/**
 * Create a filter effect for the "drop" feature
 * @returns A Tone.js filter effect
 */
export const createDropFilter = () => {
  return new Tone.Filter({
    type: 'lowpass',
    frequency: 20000,
    rolloff: -24
  });
};

/**
 * Schedule a sequence of notes to be played
 * @param synth The Tone.js synth to use
 * @param notes Array of note objects with note and duration
 * @param tempo The tempo in BPM
 */
export const scheduleNotes = (
  synth: Tone.PolySynth,
  notes: Array<{ note: string; duration: string }>,
  tempo: number = 120
) => {
  // Set the BPM
  Tone.Transport.bpm.value = tempo;
  
  // Create a sequence
  const seq = new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note.note, note.duration, time);
    },
    notes,
    '8n'
  );
  
  // Start the sequence
  seq.start(0);
  
  return seq;
};
