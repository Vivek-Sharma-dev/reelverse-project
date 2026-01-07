import { useEffect, useState, useRef, useCallback } from "react";
import api from "../../api/tmdbApi";
import MovieCard from "../../Components/MovieCard";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading.json";
import infinityLoading from "../../assets/animations/loadingInfinity.json";
import HeroCarousel from "../../Components/HeroCarousel";

const NowPlaying = () => {
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

  const getNowPlayingMovies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/movie/now_playing", {
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
      console.log(`error fetching upcoming movies: ${error}`);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    getNowPlayingMovies();
  }, [getNowPlayingMovies]);

  return (
    <>
      <HeroCarousel movies={movies.slice(0, 5)} />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Now Playing Movies
        </h1>
        {loading && movies.length === 0 ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
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
          <p className=" flex justify-center mt-8">
            <Lottie
              animationData={infinityLoading}
              loop={true}
              style={{ width: "100px", background: "transparent" }}
            />
          </p>
        )}
      </div>
    </>
  );
};

export default NowPlaying;
