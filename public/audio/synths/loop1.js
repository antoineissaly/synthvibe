// This is a placeholder for a real audio file
// In a real application, you would use actual audio files
// This script creates a simple audio buffer when imported

export const createLoop1 = (audioContext) => {
  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(2, sampleRate * 2, sampleRate);
  
  // Fill the buffer with a simple sine wave
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    const frequency = 440; // A4 note
    
    for (let i = 0; i < channelData.length; i++) {
      // Simple sine wave at 440Hz
      channelData[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.5;
      
      // Add some decay
      const decay = 1 - (i / channelData.length);
      channelData[i] *= decay;
    }
  }
  
  return buffer;
};
