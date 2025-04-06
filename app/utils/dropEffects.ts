import * as Tone from 'tone';
import { createImpactSound } from '../../public/audio/effects/impact';

// Global effects for the drop
let dropFilter: Tone.Filter | null = null;
let dropReverb: Tone.Reverb | null = null;
let dropDistortion: Tone.Distortion | null = null;
let impactSound: Tone.Player | null = null;

/**
 * Initialize the drop effects
 * This should be called when the audio context is ready
 */
export const initializeDropEffects = async () => {
  // Create a filter for frequency manipulation
  dropFilter = new Tone.Filter({
    type: 'lowpass',
    frequency: 20000,
    rolloff: -24
  }).toDestination();
  
  // Create a reverb for spatial effects
  dropReverb = new Tone.Reverb({
    decay: 1.5,
    wet: 0
  }).connect(dropFilter);
  
  // Create a distortion for intensity
  dropDistortion = new Tone.Distortion({
    distortion: 0,
    wet: 0
  }).connect(dropReverb);
  
  // Connect the main output to our effects chain
  Tone.Destination.disconnect();
  Tone.Destination.connect(dropDistortion);
  
  // Create the impact sound buffer
  const impactBuffer = createImpactSound(Tone.context);
  
  // Create a player with the impact sound buffer
  impactSound = new Tone.Player({
    loop: false,
    autostart: false,
    volume: -10
  }).toDestination();
  
  // Set the buffer
  impactSound.buffer = new Tone.ToneAudioBuffer().fromArray(
    [impactBuffer.getChannelData(0), impactBuffer.getChannelData(1)]
  );
  
  console.log('Drop effects initialized');
};

/**
 * Execute the build-up effect
 * @param progress The build-up progress (0-100)
 */
export const executeBuildUp = (progress: number) => {
  if (!dropFilter || !dropReverb || !dropDistortion) return;
  
  // Map progress to filter frequency (20000 down to 500)
  const filterFreq = 20000 - (progress / 100) * 19500;
  dropFilter.frequency.value = filterFreq;
  
  // Gradually increase reverb as we build up
  const reverbWet = (progress / 100) * 0.3;
  dropReverb.wet.value = reverbWet;
  
  // Gradually increase distortion as we build up
  const distortionAmount = (progress / 100) * 0.2;
  dropDistortion.distortion = distortionAmount;
  dropDistortion.wet.value = distortionAmount;
};

/**
 * Execute the drop effect
 */
export const executeDrop = () => {
  if (!dropFilter || !dropReverb || !dropDistortion || !impactSound) return;
  
  // Play the impact sound
  impactSound.start();
  
  // Quick filter sweep
  dropFilter.frequency.cancelScheduledValues(Tone.now());
  dropFilter.frequency.value = 100;
  dropFilter.frequency.linearRampToValueAtTime(20000, Tone.now() + 0.1);
  
  // Increase reverb momentarily
  dropReverb.wet.cancelScheduledValues(Tone.now());
  dropReverb.wet.value = 0.8;
  dropReverb.wet.linearRampToValueAtTime(0.2, Tone.now() + 0.5);
  
  // Increase distortion momentarily
  dropDistortion.distortion = 0.8;
  dropDistortion.wet.value = 0.8;
  
  // Schedule reset of distortion
  Tone.Transport.scheduleOnce(() => {
    if (dropDistortion) {
      dropDistortion.distortion = 0;
      dropDistortion.wet.value = 0;
    }
  }, '+0.5');
  
  // Briefly lower and restore master volume for the "suck" effect
  const currentVolume = Tone.Destination.volume.value;
  Tone.Destination.volume.value = -40;
  Tone.Destination.volume.linearRampToValueAtTime(currentVolume, Tone.now() + 0.1);
};

/**
 * Reset all drop effects
 */
export const resetDropEffects = () => {
  if (!dropFilter || !dropReverb || !dropDistortion) return;
  
  // Reset filter
  dropFilter.frequency.cancelScheduledValues(Tone.now());
  dropFilter.frequency.value = 20000;
  
  // Reset reverb
  dropReverb.wet.cancelScheduledValues(Tone.now());
  dropReverb.wet.value = 0;
  
  // Reset distortion
  dropDistortion.distortion = 0;
  dropDistortion.wet.value = 0;
};

/**
 * Clean up drop effects
 */
export const cleanupDropEffects = () => {
  if (dropFilter) {
    dropFilter.dispose();
    dropFilter = null;
  }
  
  if (dropReverb) {
    dropReverb.dispose();
    dropReverb = null;
  }
  
  if (dropDistortion) {
    dropDistortion.dispose();
    dropDistortion = null;
  }
  
  if (impactSound) {
    impactSound.dispose();
    impactSound = null;
  }
  
  // Reconnect the main output directly to the destination
  Tone.Destination.disconnect();
  Tone.Destination.toDestination();
};
