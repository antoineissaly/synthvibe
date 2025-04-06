'use client';

import React from 'react';
import AudioContext from './components/AudioContext';
import Track from './components/Track';
import TopControls from './components/TopControls';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white relative overflow-hidden">
      {/* Grid overlay for synthwave effect */}
      <div className="absolute inset-0 z-0 grid-background"></div>
      
      {/* Sun/horizon effect */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-pink-600 to-transparent opacity-20"></div>
      
      {/* Audio Context Button - Hidden in corner */}
      <div className="fixed top-2 right-2 z-50">
        <AudioContext />
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 mb-2 tracking-wider">
            SYNTHVIBE
          </h1>
        </header>
        
        <main className="backdrop-blur-sm bg-black/30 border border-pink-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
          {/* Top Controls Section */}
          <TopControls />
          
          {/* Tracks Section */}
          <div>
            {[1, 2].map((trackNumber) => (
              <Track key={trackNumber} trackNumber={trackNumber} />
            ))}
          </div>
        </main>
        
        <footer className="mt-6 text-center text-pink-300/70 text-sm">
          <p>SynthVibe - Make-In 04/05/2025</p>
        </footer>
      </div>
    </div>
  );
}
