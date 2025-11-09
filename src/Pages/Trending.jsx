import React, { useEffect, useState, useRef, useCallback } from "react";
import api from "../api/tmdbApi";
import MovieCard from "../Components/MovieCard";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );


  const getTrendingMovies = async () => {
    setLoading(true);
    try {
      const res = await api.get("/trending/movie/week", {
        params: {
          page: page,
        },
      });

      setMovies((prevMovies) => {
        const newMovies = [
          ...prevMovies,
          ...res.data.results.filter((movie) => movie),
        ];
        const existingMovieIds = new Set(prevMovies.map((movie) => movie.id));
        const uniqueMovies = newMovies.filter(
          (movie) => !existingMovieIds.has(movie.id)
        );
        return [...prevMovies, ...uniqueMovies];
      });

      setHasMore(res.data.results.length > 0);
    } catch (error) {
      console.log(`error fetching trending movies: ${error}`);
    }
    setLoading(false);
  };

  console.log(movies);

  useEffect(() => {
    getTrendingMovies();
  }, [page]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
        All Trending Movies
      </h1>
      {loading && movies.length === 0 ? (
        <p className="text-gray-400 flex justify-center items-center h-[60dvh] text-2xl md:text-3xl font-bold">Loading movies...</p>
      ) : (
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-4">
          {movies.map((movie, idx) => {
            if (movies.length === idx + 1) {
              return (
                <div ref={lastMovieElementRef} key={movie.id}>
                  <MovieCard movie={movie} />
                </div>
              );
            } else {
              return <MovieCard key={movie.id} movie={movie} />;
            }
          })}
        </div>
      )}
      {loading && movies.length > 0 && (
        <p className="text-gray-400 text-lg w-full text-center mt-8">
          Loading more movies...
        </p>
      )}
    </div>
  );
};

export default Trending;
