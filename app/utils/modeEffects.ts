import * as Tone from 'tone';
import { mapRange } from './audioLoops';

/**
 * Mode effect types
 * Each mode represents a different audio effect configuration
 */
export type ModeEffectType = 'filter' | 'chorus' | 'delay' | 'distortion' | 'phaser';

/**
 * Mode effect configuration
 */
export interface ModeEffectConfig {
  type: ModeEffectType;
  name: string;
  description: string;
  createEffect: () => Tone.ToneAudioNode;
  updateEffect: (effect: Tone.ToneAudioNode, value: number) => void;
}

/**
 * Available mode effects
 */
export const modeEffects: ModeEffectConfig[] = [
  {
    type: 'filter',
    name: 'Resonant Filter',
    description: 'A resonant filter that sweeps through frequencies',
    createEffect: () => {
      return new Tone.Filter({
        type: 'bandpass',
        frequency: 1000,
        Q: 5,
        rolloff: -12
      });
    },
    updateEffect: (effect, value) => {
      if (effect instanceof Tone.Filter) {
        // Map 0-100 to 100-5000 Hz (logarithmic)
        const freq = Math.pow(10, mapRange(value, 0, 100, 2, 3.7));
        effect.frequency.value = freq;
        
        // Increase resonance with value
        effect.Q.value = mapRange(value, 0, 100, 1, 10);
      }
    }
  },
  {
    type: 'chorus',
    name: 'Synthwave Chorus',
    description: 'A lush chorus effect for that classic 80s sound',
    createEffect: () => {
      return new Tone.Chorus({
        frequency: 1.5,
        delayTime: 3.5,
        depth: 0.7,
        type: 'sine',
        spread: 180,
        wet: 0.5
      }).start();
    },
    updateEffect: (effect, value) => {
      if (effect instanceof Tone.Chorus) {
        // Adjust chorus parameters based on value
        effect.depth.value = mapRange(value, 0, 100, 0.1, 0.9);
        effect.frequency.value = mapRange(value, 0, 100, 0.5, 4);
        effect.wet.value = mapRange(value, 0, 100, 0.1, 0.8);
      }
    }
  },
  {
    type: 'delay',
    name: 'Echo Chamber',
    description: 'A ping-pong delay effect for spatial depth',
    createEffect: () => {
      return new Tone.PingPongDelay({
        delayTime: 0.25,
        feedback: 0.3,
        wet: 0.5
      });
    },
    updateEffect: (effect, value) => {
      if (effect instanceof Tone.PingPongDelay) {
        // Adjust delay parameters based on value
        effect.delayTime.value = mapRange(value, 0, 100, 0.1, 0.5);
        effect.feedback.value = mapRange(value, 0, 100, 0.1, 0.7);
        effect.wet.value = mapRange(value, 0, 100, 0.1, 0.8);
      }
    }
  },
  {
    type: 'distortion',
    name: 'Retro Distortion',
    description: 'A warm distortion effect for gritty textures',
    createEffect: () => {
      const dist = new Tone.Chebyshev(4);
      dist.wet.value = 0.5;
      return dist;
    },
    updateEffect: (effect, value) => {
      if (effect instanceof Tone.Chebyshev) {
        // Adjust Chebyshev parameters based on value
        effect.order = Math.floor(mapRange(value, 0, 100, 2, 50));
        effect.wet.value = mapRange(value, 0, 100, 0.1, 0.8);
      }
    }
  },
  {
    type: 'phaser',
    name: 'Cosmic Phaser',
    description: 'A sweeping phaser effect for movement',
    createEffect: () => {
      return new Tone.AutoFilter({
        frequency: 0.5,
        depth: 0.8,
        type: 'sine',
        wet: 0.5
      }).start();
    },
    updateEffect: (effect, value) => {
      if (effect instanceof Tone.AutoFilter) {
        // Adjust autofilter parameters based on value
        effect.frequency.value = mapRange(value, 0, 100, 0.1, 2);
        effect.depth.value = mapRange(value, 0, 100, 0.2, 0.9);
        effect.wet.value = mapRange(value, 0, 100, 0.1, 0.8);
      }
    }
  }
];

/**
 * Get a mode effect by index
 * @param index The index of the effect (0-4)
 * @returns The mode effect configuration
 */
export const getModeEffect = (index: number): ModeEffectConfig => {
  // Ensure index is within bounds
  const safeIndex = Math.max(0, Math.min(modeEffects.length - 1, index));
  return modeEffects[safeIndex];
};

/**
 * Create a mode effect chain for a track
 * @param modeValue The mode value (0-100)
 * @returns An object containing the effect chain and update function
 */
export const createModeEffectChain = (modeValue: number = 50) => {
  // Determine which effect to use based on the mode value
  const effectIndex = Math.floor(mapRange(modeValue, 0, 100, 0, modeEffects.length));
  const effectConfig = getModeEffect(effectIndex);
  
  // Create the effect
  const effect = effectConfig.createEffect();
  
  // Calculate the intensity within this effect's range
  const rangeSize = 100 / modeEffects.length;
  const rangeStart = effectIndex * rangeSize;
  const normalizedValue = mapRange(modeValue, rangeStart, rangeStart + rangeSize, 0, 100);
  
  // Update the effect with the normalized value
  effectConfig.updateEffect(effect, normalizedValue);
  
  // Return the effect and an update function
  return {
    effect,
    update: (newValue: number) => {
      // Recalculate effect and intensity if the value changes significantly
      const newEffectIndex = Math.floor(mapRange(newValue, 0, 100, 0, modeEffects.length));
      
      if (newEffectIndex !== effectIndex) {
        // If the effect type changes, we would need to recreate the chain
        // This is handled by the Track component by recreating the player
        return false;
      }
      
      // Update the existing effect
      const newRangeStart = newEffectIndex * rangeSize;
      const newNormalizedValue = mapRange(
        newValue, 
        newRangeStart, 
        newRangeStart + rangeSize, 
        0, 
        100
      );
      
      effectConfig.updateEffect(effect, newNormalizedValue);
      return true;
    }
  };
};
