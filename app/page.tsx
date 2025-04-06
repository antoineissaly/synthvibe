'use client';

import React from 'react';
import AudioContext from './components/AudioContext';
import Track from './components/Track';
import TopControls from './components/TopControls';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Audio Context Button - Hidden in corner */}
      <div className="fixed top-2 right-2 z-50">
        <AudioContext />
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <main className="border-2 border-gray-300 rounded-lg p-6">
          {/* Top Controls Section */}
          <TopControls />
          
          {/* Tracks Section */}
          <div>
            {[1, 2, 3, 4, 5].map((trackNumber) => (
              <Track key={trackNumber} trackNumber={trackNumber} />
            ))}
          </div>
        </main>
        
        <footer className="mt-6 text-center text-gray-500 text-sm">
          <p>SynthVibe - Phase 1 Implementation</p>
        </footer>
      </div>
    </div>
  );
}
