// This is a placeholder for a real audio file
// In a real application, you would use actual audio files
// This script creates a synthwave-style audio buffer when imported

export const createLoop1 = (audioContext) => {
  console.log('Creating Loop 1 (Frenzy)');
  const sampleRate = audioContext.sampleRate;
  const duration = 2; // 2 seconds
  const buffer = audioContext.createBuffer(2, sampleRate * duration, sampleRate);
  
  // Fill the buffer with a synthwave-style pattern
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    
    // Create a more complex pattern with multiple frequencies
    const baseFreq = 220; // A3 note
    const chordFreqs = [baseFreq, baseFreq * 5/4, baseFreq * 3/2]; // A minor chord
    const rhythmPattern = [1, 0, 0.7, 0, 1, 0.5, 0.7, 0]; // Synthwave rhythm
    
    // Fill the buffer with our pattern
    for (let i = 0; i < channelData.length; i++) {
      const t = i / sampleRate;
      const beat = Math.floor((t * 4) % rhythmPattern.length);
      const amplitude = rhythmPattern[beat] * 0.5; // Louder amplitude
      
      // Sum multiple frequencies for a richer sound
      let sample = 0;
      for (let j = 0; j < chordFreqs.length; j++) {
        sample += Math.sin(2 * Math.PI * chordFreqs[j] * t) * (amplitude / chordFreqs.length);
        
        // Add some harmonics
        sample += Math.sin(2 * Math.PI * chordFreqs[j] * 2 * t) * (amplitude / 4);
      }
      
      // Add a subtle kick drum on beats 0 and 4
      if (beat === 0 || beat === 4) {
        const kickFreq = 60 * Math.exp(-t % (0.5) * 10);
        sample += Math.sin(2 * Math.PI * kickFreq * t) * 0.5 * Math.exp(-t % (0.5) * 10);
      }
      
      // Apply some compression to avoid clipping
      channelData[i] = Math.tanh(sample);
    }
  }
  
  console.log('Loop 1 created successfully');
  return buffer;
};
