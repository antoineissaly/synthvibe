const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

// Create directories if they don't exist
const dirs = [
  'public/audio/synths',
  'public/audio/drums',
  'public/audio/effects'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Use SoX to generate audio samples
// Make sure SoX is installed: brew install sox (on macOS)

// Generate a synthwave bass loop
exec('sox -n public/audio/synths/bass.wav synth 4 sine 80 sine 160 chorus 0.7 0.9 55 0.4 0.25 2 -t 0.5 0.5 gain -3 fade 0.1 4 0.1 repeat 2', (error) => {
  if (error) {
    console.error(`Error generating bass.wav: ${error.message}`);
    return;
  }
  console.log('Generated bass.wav');
});

// Generate a synthwave lead loop
exec('sox -n public/audio/synths/lead.wav synth 4 sawtooth 440 sawtooth 443 sawtooth 437 chorus 0.6 0.9 50 0.4 0.25 2 -t 0.5 0.5 reverb gain -5 fade 0.1 4 0.1 repeat 2', (error) => {
  if (error) {
    console.error(`Error generating lead.wav: ${error.message}`);
    return;
  }
  console.log('Generated lead.wav');
});

// Generate a synthwave pad loop
exec('sox -n public/audio/synths/pad.wav synth 4 square 220 square 330 square 440 chorus 0.7 0.9 60 0.4 0.25 2 -t 0.5 0.5 reverb gain -8 fade 0.5 4 0.5 repeat 2', (error) => {
  if (error) {
    console.error(`Error generating pad.wav: ${error.message}`);
    return;
  }
  console.log('Generated pad.wav');
});

// Generate a drum loop
exec('sox -n public/audio/drums/beat.wav synth 4 square 80 square 120 bandpass 200 400 overdrive 10 gain -5 fade 0.1 4 0.1 repeat 2', (error) => {
  if (error) {
    console.error(`Error generating beat.wav: ${error.message}`);
    return;
  }
  console.log('Generated beat.wav');
});

// Generate an effect sound
exec('sox -n public/audio/effects/sweep.wav synth 2 sine 100-5000 gain -5 fade 0.1 2 0.1', (error) => {
  if (error) {
    console.error(`Error generating sweep.wav: ${error.message}`);
    return;
  }
  console.log('Generated sweep.wav');
});

console.log('Audio sample generation complete (or in progress).');
