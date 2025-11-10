import React, { useState, useEffect } from "react";
import api from "../api/tmdbApi";
import MovieCard from "../Components/MovieCard";
import { Link } from "react-router-dom";
import HeroCarousel from "../Components/HeroCarousel";
import { MdError } from "react-icons/md";

const currentYear = new Date().getFullYear();

const Home = () => {
  // --- 1. ADD STATE VARIABLES ---
   const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]); // This will now hold both
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const getNowPlayingMovies = () => {
    return api.get("/movie/now_playing");
  };
  const getTrendingContent = () => {
    return Promise.all([
      api.get("/trending/movie/week", { params: { page: 1 } }),
      api.get("/trending/tv/week", { params: { page: 1 } }),
    ]);
  };

  // --- THIS IS THE FIX ---
  const getTopRatedModernMovies = () => {
    const params = {
      primary_release_year: currentYear,
      sort_by: "vote_average.desc",
      "vote_count.gte": 500,
      page: 1, // Only page 1 for the homepage
    };
    // Fetch both movies and TV shows
    return Promise.all([
      api.get("/discover/movie", { params }),
      api.get("/discover/tv", { params: { ...params, first_air_date_year: currentYear } }) // TV uses a different param for year
    ]);
  };
  // --- END FIX ---

  const getUpcomingMovies = () => {
    return api.get("/movie/upcoming");
  };

  const getAllMovies = async () => {
    setLoading(true);
    setErr(null);
      try {
        const savedList = localStorage.getItem("recentlyViewed");
        const viewedList = (savedList && savedList !== "undefined") ? JSON.parse(savedList) : [];
        setRecentlyViewed(viewedList);

        // --- FIX: Update destructuring ---
        const [
          nowPlayingRes,
          [trendingMovieRes, trendingTvRes],
          [topRatedMovieRes, topRatedTvRes], // 'topRatedRes' is now an array
          upcomingRes,
        ] = await Promise.all([
          getNowPlayingMovies(),
          getTrendingContent(),
          getTopRatedModernMovies(), // This now returns an array
          getUpcomingMovies(),
        ]);
        // --- END FIX ---

        setNowPlayingMovies(nowPlayingRes.data.results.filter((movie) => movie));
        setUpcomingMovies(upcomingRes.data.results.filter((movie) => movie));

        // Set Trending Content
        const newMovies = trendingMovieRes.data.results.filter((item) => item);
        const newTvShows = trendingTvRes.data.results.filter((item) => item);
        const combinedTrending = [...newMovies, ...newTvShows];
        combinedTrending.sort((a, b) => b.popularity - a.popularity);
        setTrendingContent(combinedTrending);

        // --- FIX: Set Top Rated Content (Movies & TV) ---
        const newTopMovies = topRatedMovieRes.data.results.filter((item) => item);
        const newTopTv = topRatedTvRes.data.results.filter((item) => item);
        const combinedTopRated = [...newTopMovies, ...newTopTv];
        combinedTopRated.sort((a, b) => b.popularity - a.popularity); // Sort by popularity is better
        setTopRatedMovies(combinedTopRated);
      // --- END FIX ---

    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErr(error.message || "Failed to fetch movies. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <>
      {/* --- 5. ADD LOADING STATE --- */}
      {loading ? (
        // --- A. LOADING STATE ---
        <p className="text-gray-400 flex justify-center items-center h-[60dvh] text-2xl md:text-3xl font-bold">
          Loading all movies...
        </p>
      ) : err ? (
        // --- B. ERROR STATE ---
        <div className="text-red-400 flex flex-col justify-center items-center h-[60dvh] text-2xl md:text-3xl font-bold">
          <MdError size={60} className="mb-4" />
          <p>Error: {err}</p>
          <p className="text-lg text-gray-400 mt-2">
            Could not load data. Please check your API key or network
            connection.
          </p>
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
                Trending Now
              </h1>
              <Link
                to="/trending"
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors text-lg md:text-2xl"
              >
                See All
              </Link>
            </div>
            <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-4">
              {trendingContent.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
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

          {/* --- 5. ADD NEW "UPCOMING" SECTION --- */}
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
