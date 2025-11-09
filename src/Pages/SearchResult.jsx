import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../Components/MovieCard";
import api from "../api/tmdbApi"; // Import the api instance
import Actor from "../Components/Actor";

const SearchResult = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [actors, setActors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const fetchAllResults = async () => {
    setLoading(true);

    try {
      const [movieRes, actorRes, tvRes] = await Promise.all([
        api.get("/search/movie", { params: { query: query, page: 1 } }),
        api.get("/search/person", { params: { query: query, page: 1 } }),
        api.get("/search/tv", { params: { query: query, page: 1 } }),
      ]);

      setMovies(
        movieRes.data.results.filter(
          (movie) => movie.backdrop_path || movie.poster_path
        )
      );
      setActors(actorRes.data.results.filter((actor) => actor.profile_path));
      setTvShows(
        tvRes.data.results.filter((tv) => tv.backdrop_path || tv.poster_path)
      );
    } catch (error) {
      console.log(`error fetching search results: ${error}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllResults();
  }, [query]);

  const noResult =
    !loading &&
    movies.length === 0 &&
    tvShows.length === 0 &&
    actors.length === 0;
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl text-white font-bold mb-6">
        Results for: <span className="text-blue-500"> {query}</span>
      </h1>

      {loading && (
        <p className="text-gray-400 flex justify-center items-center h-[60dvh] text-2xl md:text-3xl font-bold">
          Searching...
        </p>
      )}

      {noResult && (
        <p className="text-gray-400 text-center text-lg">
          No movies, TV shows or Actor found matching "{query}"
        </p>
      )}
      {!loading && movies.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-4">
            {movies.slice(0, 15).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {!loading && actors.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Actor</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-4">
            {actors.slice(0, 15).map((actor) => (
              <Actor key={actor.id} actor={actor} />
            ))}
          </div>
        </section>
      )}

      {!loading && tvShows.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">TV Shows</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-4">
            {tvShows.slice(0, 15).map((show) => {
              return <MovieCard key={show.id} movie={show} />;
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default SearchResult;
