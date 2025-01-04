import React, { useState } from 'react';
import { X } from 'lucide-react';

function VideoPlayer({ tmdbId, onClose }) {
  const [selectedSource, setSelectedSource] = useState('rivestream');

  const sources = {
    rivestream: `https://rivestream.live/embed?type=movie&id=${tmdbId}`,
    rgshows: `https://embed.rgshows.me/api/2/movie/?id=${tmdbId}`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 md:px-0">
      <div className="relative w-full max-w-5xl ">
        <div className="absolute -top-14 flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between ">
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="w-full rounded bg-gray-800 px-3 py-1 text-white sm:w-auto"
          >
            <option value="rivestream">Source 1</option>
            <option value="rgshows">Source 2</option>
          </select>
          <button
            onClick={onClose}
            className="absolute right-0 -top-8 text-white hover:text-gray-300 sm:static"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="relative mt-0 pt-[100%] md:pt-[66.25%] sm:mt-0">
          <iframe
            src={sources[selectedSource]}
            className="absolute inset-0 h-full w-full rounded-lg"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
