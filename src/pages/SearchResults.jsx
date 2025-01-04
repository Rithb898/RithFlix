import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import WebSeriesCard from "../components/WebSeriesCard";
import NavBar from "../components/NavBar";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    if (query) {
      // Search movies
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${query}`
      )
        .then((res) => res.json())
        .then((data) => setMovies(data.results));

      // Search TV shows
      fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${query}`
      )
        .then((res) => res.json())
        .then((data) => setTvShows(data.results));
    }
  }, [query]);

  return (
    <div>
      <NavBar />
      <div className="pt-20">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Search Results for "{query}"
        </h2>
        {movies.length > 0 && (
          <section className="py-8">
            <h3 className="mb-6 text-xl font-bold text-white">Movies</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </section>
        )}
        {tvShows.length > 0 && (
          <section className="py-8">
            <h3 className="mb-6 text-xl font-bold text-white">TV Shows</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {tvShows.map((show) => (
                <WebSeriesCard movie={show} key={show.id} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
