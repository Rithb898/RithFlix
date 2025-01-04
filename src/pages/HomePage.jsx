import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import WebSeriesCard from "../components/WebSeriesCard";
import NavBar from "../components/NavBar";


function HomePage() {
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [trendingWebSeries, setTrendingWebSeries] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setTrendingMovie(data.results);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setTrendingWebSeries(data.results);
      });
  }, []);
  console.log(trendingWebSeries);
  return (
    <>
      <div className='max-w-[95rem] flex justify-center flex-col mx-auto'> 
        <section>
          <h2 className='mb-6 text-2xl font-bold text-white'>
            Trending Movies
          </h2>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {trendingMovie.map((movie) => {
              return <MovieCard movie={movie} key={movie.id} />;
            })}
          </div>
        </section>
        <section className='py-8'>
          <h2 className='mb-6 text-2xl font-bold text-white'>
            Trending Web Series
          </h2>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {trendingWebSeries.map((series) => {
              return <WebSeriesCard movie={series} key={series.id} />;
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
