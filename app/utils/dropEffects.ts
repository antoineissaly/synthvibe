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
  try {
    console.log('Setting up drop effect chain');
    // Instead of disconnecting the destination, we'll create a parallel signal path
    // This way, the original audio path remains intact
    const mainOutput = Tone.getDestination();
    dropDistortion.connect(mainOutput);
    
    console.log('Drop effect chain connected successfully');
  } catch (error) {
    console.error('Error connecting drop effect chain:', error);
  }
  
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
  
  // Create a more subtle "suck" effect without completely cutting the audio
  try {
    console.log('Executing drop effect');
    const currentVolume = Tone.Destination.volume.value;
    // Use a less extreme volume dip to maintain some audio
    Tone.Destination.volume.value = currentVolume - 20;
    Tone.Destination.volume.linearRampToValueAtTime(currentVolume, Tone.now() + 0.1);
    
    // Create a more pronounced impact sound
    if (impactSound) {
      impactSound.volume.value = -5; // Louder impact
    }
  } catch (error) {
    console.error('Error executing drop effect:', error);
  }
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
  
  // Clean up without disrupting the main audio path
  console.log('Cleaning up drop effects');
};
