import React from 'react';
import { X } from 'lucide-react';

function VideoPlayer({ tmdbId, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-5xl">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <iframe
            src={`https://rivestream.live/embed?type=movie&id=${tmdbId}`}
            className="absolute inset-0 h-full w-full rounded-lg"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
