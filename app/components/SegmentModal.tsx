import React from 'react';
import { SegmentType } from '../utils/audioLoops';

interface SegmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSegment: (segment: string) => void;
  currentSegment: SegmentType;
}

/**
 * Modal component for selecting audio segments
 */
const SegmentModal: React.FC<SegmentModalProps> = ({
  isOpen,
  onClose,
  onSelectSegment,
  currentSegment
}) => {
  // If the modal is not open, don't render anything
  if (!isOpen) return null;
  
  // Available segments with display names
  const segments = [
    { id: 'A', name: 'Frenzy' },
    { id: 'B', name: 'Hotline' },
    { id: 'C', name: 'Soundcore' },
    { id: 'D', name: 'Batcave' },
    { id: 'E', name: 'Vibes' }
  ];
  
  // Handle segment selection
  const handleSelectSegment = (segment: string) => {
    onSelectSegment(segment);
    onClose();
  };
  
  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-black/80 border border-pink-500/50 rounded-lg p-6 w-80 shadow-[0_0_25px_rgba(236,72,153,0.4)] neon-border">
        <h2 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 font-bold mb-4 text-center">
          Select Segment
        </h2>
        
        <div className="grid gap-3">
          {segments.map(segment => (
            <button
              key={segment.id}
              className={`py-3 px-4 rounded-md text-left transition-all ${
                currentSegment === segment.id
                  ? 'bg-purple-900/70 text-purple-200 border border-purple-500 neon-border'
                  : 'bg-black/50 text-pink-300 border border-pink-500/30 hover:bg-purple-900/30 hover:border-purple-500/50'
              }`}
              onClick={() => handleSelectSegment(segment.id)}
            >
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  currentSegment === segment.id
                    ? 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]'
                    : 'bg-pink-500/50'
                }`}></div>
                <span className={currentSegment === segment.id ? 'neon-text' : ''}>
                  {segment.name}
                </span>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            className="bg-black/50 text-pink-300 border border-pink-500/30 py-2 px-4 rounded hover:bg-pink-900/30 hover:border-pink-500/50 transition-all"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SegmentModal;
