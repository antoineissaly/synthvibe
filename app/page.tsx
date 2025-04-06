'use client';

import React from 'react';
import AudioContext from './components/AudioContext';
import Track from './components/Track';
import DropControl from './components/DropControl';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Audio Context Button */}
      <AudioContext />
      
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            SynthVibe
          </h1>
          <p className="text-gray-400">Create and perform synthwave music in real-time</p>
        </header>
        
        <main className="grid grid-cols-1 gap-8">
          {/* Tracks Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Tracks</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((trackNumber) => (
                <Track key={trackNumber} trackNumber={trackNumber} />
              ))}
            </div>
          </section>
          
          {/* Drop Control Section */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">Controls</h2>
            <DropControl />
          </section>
        </main>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>SynthVibe - Phase 1 Implementation</p>
        </footer>
      </div>
    </div>
  );
}
