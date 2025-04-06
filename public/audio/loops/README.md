# Audio Loops for SynthVibe

## Current Status

The WAV files in this directory are currently placeholder files created with the `touch` command. These are not valid audio files, which is why you're seeing the "Unable to decode audio data" error in the console.

## How to Fix

To fix this issue, you need to replace these placeholder files with actual WAV audio files. Here are some options:

1. **Use your own audio loops**: Replace these files with your own WAV format audio loops.

2. **Download free loops**: There are many websites offering free synthwave loops that you can use:
   - Looperman (https://www.looperman.com/loops/genres/royalty-free-synthwave-loops-samples-sounds-wavs-download)
   - Splice (https://splice.com/sounds/genres/synthwave)
   - Free Sound (https://freesound.org/search/?q=synthwave)

3. **Generate loops**: You can use the scripts in the `scripts` directory to generate simple audio loops:
   ```
   cd scripts
   npm install
   node generate-loops.js
   ```

## File Requirements

- Format: WAV (PCM encoding is most compatible)
- Duration: Ideally 1-4 seconds (loops will repeat)
- Names: Keep the same filenames (frenzy.wav, hotline.wav, soundcore.wav, batcave.wav, vibes.wav)

## Fallback Mechanism

The application includes a fallback mechanism that generates simple sine wave tones if the audio files cannot be loaded. This is why the application still works even with placeholder files, but for the best experience, you should use real audio loops.
