// This is a placeholder for a real audio file
// In a real application, you would use actual audio files
// This script creates a simple audio buffer when imported

export const createLoop5 = (audioContext) => {
  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(2, sampleRate * 2, sampleRate);
  
  // Fill the buffer with a simple noise pattern
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    
    for (let i = 0; i < channelData.length; i++) {
      // Simple noise with some filtering
      const noise = Math.random() * 2 - 1;
      
      // Apply a simple low-pass filter by averaging with previous samples
      if (i > 0) {
        channelData[i] = (noise * 0.3 + channelData[i-1] * 0.7) * 0.3;
      } else {
        channelData[i] = noise * 0.3;
      }
      
      // Add some decay
      const decay = 1 - (i / channelData.length);
      channelData[i] *= decay;
    }
  }
  
  return buffer;
};
