// This script generates an impact sound for the drop effect
// It creates a buffer with a quick attack and decay

export const createImpactSound = (audioContext) => {
  const sampleRate = audioContext.sampleRate;
  const duration = 1; // 1 second
  const buffer = audioContext.createBuffer(2, sampleRate * duration, sampleRate);
  
  // Fill both channels with the impact sound
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    
    // Create a quick attack and decay envelope
    for (let i = 0; i < channelData.length; i++) {
      const t = i / sampleRate;
      
      // Quick attack (0-0.01s)
      if (t < 0.01) {
        channelData[i] = (t / 0.01) * 0.9;
      } 
      // Decay (0.01-1s)
      else {
        // Exponential decay
        const decay = Math.exp(-10 * (t - 0.01));
        
        // Add some noise for texture
        const noise = (Math.random() * 2 - 1) * 0.2;
        
        // Combine with a low frequency sine wave
        const sine = Math.sin(2 * Math.PI * 60 * t) * 0.7;
        
        // Mix the components
        channelData[i] = (sine + noise) * decay * 0.9;
      }
    }
  }
  
  return buffer;
};
