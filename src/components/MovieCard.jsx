import { Play, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function MovieCard({movie}) {
  return (
    <Link to={`/movie/${movie.id}`} className='block'>
      <div className='group relative'>
        <div className='aspect-2/3 overflow-hidden rounded-lg'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            <div className='absolute bottom-0 p-4'>
              <h3 className='text-lg font-semibold text-white'>{movie.original_title}</h3>
              <div className='mt-2 flex items-center gap-2'>
                <Star className='h-4 w-4 text-yellow-400' />
                <span className='text-sm text-white'>
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <div className='mt-3 flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700'>
                <Play className='h-4 w-4' />
                Play Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
