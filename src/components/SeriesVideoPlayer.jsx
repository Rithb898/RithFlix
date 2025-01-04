import React, { useState } from 'react';
import { X } from 'lucide-react';

const SeriesVideoPlayer = ({ tmdbId, season, episode, onClose }) => {
  const [selectedSource, setSelectedSource] = useState('rivestream');

  const sources = {
    rivestream: `https://rivestream.live/embed?type=tv&id=${tmdbId}&season=${season}&episode=${episode}`,
    rgshows: `https://embed.rgshows.me/api/2/tv/?id=${tmdbId}&s=${season}&e=${episode}`
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-5xl">
        <div className="absolute -top-14 flex w-full items-center justify-between">
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="rounded bg-gray-800 px-3 py-1 text-white"
          >
            <option value="rivestream">Source 1</option>
            <option value="rgshows">Source 2</option>
          </select>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="relative pt-[56.25%]">
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

export default SeriesVideoPlayer;
