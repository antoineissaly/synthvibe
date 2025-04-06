// This is a placeholder for a real audio file
// In a real application, you would use actual audio files
// This script creates a simple audio buffer when imported

export const createLoop4 = (audioContext) => {
  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(2, sampleRate * 2, sampleRate);
  
  // Fill the buffer with a simple triangle wave
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    const frequency = 165; // E3 note
    
    for (let i = 0; i < channelData.length; i++) {
      // Simple triangle wave at 165Hz
      const phase = (i * frequency / sampleRate) % 1;
      channelData[i] = (phase < 0.5 ? phase * 2 : 2 - phase * 2) * 0.4 - 0.2;
      
      // Add some decay
      const decay = 1 - (i / channelData.length);
      channelData[i] *= decay;
    }
  }
  
  return buffer;
};
