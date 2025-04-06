# Audio Samples Directory

This directory is intended for storing audio samples used by the SynthVibe application.

## Usage

Place audio files in this directory to make them available to the application. The following formats are supported:

- WAV (.wav)
- MP3 (.mp3)
- OGG (.ogg)

## Organization

Consider organizing samples into subdirectories based on their type:

- `/drums` - Drum and percussion samples
- `/synths` - Synthesizer loops and one-shots
- `/effects` - Sound effects and transitions
- `/vocals` - Vocal samples and phrases

## Sample Sources

When adding samples, ensure they are:

1. Royalty-free or properly licensed
2. Appropriate for the synthwave genre
3. High quality (preferably 44.1kHz, 16-bit or better)

## Accessing Samples in Code

Samples can be loaded in the application using Tone.js:

```typescript
import * as Tone from 'tone';

// Load a sample
const player = new Tone.Player({
  url: "/audio/synths/lead.wav",
  autostart: false
}).toDestination();

// Play the sample
player.start();
```

## Future Development

In future phases, this directory will be populated with:

- Synthwave drum patterns
- Bass and lead synth loops
- Atmospheric pads and textures
- Genre-appropriate sound effects
