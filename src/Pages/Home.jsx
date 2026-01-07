import { useState, useEffect, useCallback } from "react";
import api from "../api/tmdbApi";
import MovieCard from "../Components/MovieCard";
import { Link } from "react-router-dom";
import HeroCarousel from "../Components/HeroCarousel";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/loading.json";
import error from "../assets/animations/Error.json";

const currentYear = new Date().getFullYear();

const Home = () => {
  // --- 1. ADD STATE VARIABLES ---
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const getNowPlayingMovies = useCallback(() => {
    return api.get("/movie/now_playing");
  }, []);
  const getTrendingContent = useCallback(() => {
    return Promise.all([
      api.get("/trending/movie/week", { params: { page: 1 } }),
      api.get("/trending/tv/week", { params: { page: 1 } }),
    ]);
  }, []);

  const getSixMonthsAgo = () => {
    const today = new Date();
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);
    return sixMonthsAgo.toISOString().split("T")[0];
  };

  const today = new Date().toISOString().split("T")[0];

  const getTopRatedModernMovies = useCallback(() => {
    const params = {
      sort_by: "vote_average.desc",
      "primary_release_date.gte": getSixMonthsAgo(),
      "primary_release_date.lte": today,

      "vote_count.gte": 500,
      page: 1,
    };
    // Fetch both movies and TV shows
    return Promise.all([
      api.get("/discover/movie", { params }),
      api.get("/discover/tv", { params }),
    ]);
  }, [today]);

  const getUpcomingMovies = useCallback(() => {
    return api.get("/movie/upcoming");
  }, []);

  const getAllMovies = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const [
        nowPlayingRes,
        [trendingMovieRes, trendingTvRes],
        [topRatedMovieRes, topRatedTvRes],
        upcomingRes,
      ] = await Promise.all([
        getNowPlayingMovies(),
        getTrendingContent(),
        getTopRatedModernMovies(),
        getUpcomingMovies(),
      ]);

      setNowPlayingMovies(nowPlayingRes.data.results.filter((movie) => movie));
      setUpcomingMovies(upcomingRes.data.results.filter((movie) => movie));

      // Set Trending Content
      const newMovies = trendingMovieRes.data.results.filter((item) => item);
      const newTvShows = trendingTvRes.data.results.filter((item) => item);
      const combinedTrending = [...newMovies, ...newTvShows];
      combinedTrending.sort((a, b) => b.popularity - a.popularity);
      setTrendingContent(combinedTrending);

      const newTopMovies = topRatedMovieRes.data.results.map((m) => ({
        ...m,
        media_type: "movie",
      }));
      const newTopTv = topRatedTvRes.data.results.map((t) => ({
        ...t,
        media_type: "tv",
      }));
      const combinedTopRated = [...newTopMovies, ...newTopTv];
      combinedTopRated.sort((a, b) => b.popularity - a.popularity);
      setTopRatedMovies(combinedTopRated);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErr(error.message || "Failed to fetch movies. Please try again.");
    }
    setLoading(false);
  }, [
    getNowPlayingMovies,
    getTrendingContent,
    getTopRatedModernMovies,
    getUpcomingMovies,
  ]);

  // console.log(nowPlayingMovies);
  useEffect(() => {
    getAllMovies();
  }, [getAllMovies]);

  return (
    <>
      {/* --- 5. ADD LOADING STATE --- */}
      {loading ? (
        // --- A. LOADING STATE ---
        <div className="flex justify-center items-center h-[60dvh]">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      ) : err ? (
        // --- B. ERROR STATE ---
        <div>
          <Lottie animationData={error} loop={true} className="lg:h-[80vh]" />
        </div>
      ) : (
        <>
          {/* Section 1: Trending */}
          <section>
            <HeroCarousel movies={trendingContent.slice(0, 5)} />
          </section>
          <section className="container m-auto p-4 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Now Playing
              </h1>
              <Link
                to="/now-playing"
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors text-lg md:text-2xl border border-blue-400 py-1 px-4 rounded-full hover:border-blue-300"
              >
                See All
              </Link>
            </div>
            <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-4">
              {nowPlayingMovies.slice(0, 10).map((movie) => (
                <MovieCard
                  key={`${movie.id} - ${movie.media_type}`}
                  movie={movie}
                />
              ))}
            </div>
          </section>
          <section className="container m-auto p-4 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Trending Now
              </h1>
              <Link
                to="/trending"
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors text-lg md:text-2xl border border-blue-400 py-1 px-4 rounded-full hover:border-blue-300"
              >
                See All
              </Link>
            </div>
            <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-4">
              {trendingContent.slice(0, 10).map((movie) => (
                <MovieCard
                  key={`${movie.id} - ${movie.media_type}`}
                  movie={movie}
                />
              ))}
            </div>
          </section>

          {/* Section 2: Top Rated (Modern) */}
          <section className="mb-12 container p-4 m-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Top Rated ({currentYear})
              </h1>
              <Link
                to="/top-rated-movies"
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors text-lg md:text-2xl"
              >
                See All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-4">
              {topRatedMovies.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          {/* --- section 3. upcoming movies section --- */}
          <section className="container m-auto p-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Upcoming Movies
              </h1>
              <Link
                to="/upcoming"
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors text-lg md:text-2xl"
              >
                See All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-4">
              {upcomingMovies.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
