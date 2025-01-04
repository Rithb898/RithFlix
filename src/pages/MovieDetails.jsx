import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Calendar, Clock, Play } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import NavBar from '../components/NavBar';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar/>
      {showPlayer && (
        <VideoPlayer tmdbId={movie.id} onClose={() => setShowPlayer(false)} />
      )}
      
      <div className="relative h-[70vh]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative -mt-40 px-4 pb-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          
          <button
            onClick={() => setShowPlayer(true)}
            className="mt-6 flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
          >
            <Play className="h-5 w-5" />
            Play Now
          </button>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{movie.release_date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{movie.runtime} min</span>
            </div>
          </div>

          <p className="mt-8 text-lg text-gray-300">{movie.overview}</p>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Genres</h2>
            <div className="mt-4 flex gap-2">
              {movie.genres?.map(genre => (
                <span
                  key={genre.id}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
