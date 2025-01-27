import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Calendar, Flag, Play, ArrowRight } from "lucide-react";
import SeriesVideoPlayer from "../components/SeriesVideoPlayer";
import NavBar from "../components/NavBar";

function SeriesDetails() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [showPlayer, setShowPlayer] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setSeries(data));
  }, [id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setEpisodes(data.episodes || []));
  }, [id, selectedSeason]);

  const handleEpisodeClick = (episodeNumber) => {
    setSelectedEpisode(episodeNumber);
    setShowPlayer(true);
  };

  if (!series) return <div>Loading...</div>;

  return (
    <div className='min-h-screen bg-black text-white'>
      {showPlayer && (
        <SeriesVideoPlayer
          tmdbId={series.id}
          season={selectedSeason}
          episode={selectedEpisode}
          onClose={() => setShowPlayer(false)}
        />
      )}

      <div className='relative h-[70vh]'>
        <img
          src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
          alt={series.name}
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-linear-to-t from-black to-transparent' />
      </div>

      <div className='relative -mt-40 px-4 pb-12'>
        <div className='mx-auto max-w-6xl'>
          <h1 className='text-4xl font-bold'>{series.name}</h1>

          <div className='mt-4 flex flex-wrap gap-4'>
            <div className='flex items-center gap-2'>
              <Star className='h-5 w-5 text-yellow-400' />
              <span>{series.vote_average?.toFixed(1)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className='h-5 w-5' />
              <span>{series.first_air_date}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Flag className='h-5 w-5' />
              <span>{series.number_of_seasons} Seasons</span>
            </div>
          </div>

          <p className='mt-8 text-lg text-gray-300'>{series.overview}</p>

          <div className='mt-8'>
            <h2 className='text-2xl font-semibold mb-4'>Select Season</h2>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
              className='w-full md:w-48 rounded-lg bg-white/10 px-4 py-2 text-white'
            >
              {[...Array(series.number_of_seasons)].map((_, i) => (
                <option key={i + 1} value={i + 1} className='bg-gray-800'>
                  Season {i + 1}
                </option>
              ))}
            </select>

            <div className='mt-8'>
              <h3 className='text-xl font-semibold mb-4'>Episodes</h3>
              <div className='grid grid-cols-1 gap-4'>
                {episodes.map((episode) => (
                  <div
                    key={episode.id}
                    className='bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors'
                  >
                    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4'>
                      <div className='aspect-video relative'>
                        <img
                          src={
                            episode.still_path
                              ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
                              : `https://image.tmdb.org/t/p/w300${series.backdrop_path}`
                          }
                          alt={episode.name}
                          className='w-full h-full object-cover'
                        />
                        <button
                          onClick={() =>
                            handleEpisodeClick(episode.episode_number)
                          }
                          className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity'
                        >
                          <Play className='h-12 w-12 text-white' />
                        </button>
                      </div>
                      <div className='p-4'>
                        <div className='flex items-center justify-between'>
                          <h4 className='font-semibold text-lg'>
                            Episode {episode.episode_number}: {episode.name}
                          </h4>
                          <button
                            onClick={() =>
                              handleEpisodeClick(episode.episode_number)
                            }
                            className='flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-700'
                          >
                            Play <ArrowRight className='h-4 w-4' />
                          </button>
                        </div>
                        <p className='mt-2 text-sm text-gray-400'>
                          {episode.overview}
                        </p>
                        <div className='mt-2 text-xs text-gray-500'>
                          Air date: {episode.air_date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeriesDetails;
