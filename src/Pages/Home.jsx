import React, { useState, useEffect } from "react";
import api from "../api/tmdbApi";
import MovieCard from "../Components/MovieCard";
import { Link } from "react-router-dom";
import HeroCarousel  from "../Components/HeroCarousel";

const currentYear = new Date().getFullYear();

const Home = () => {
  // --- 1. ADD STATE VARIABLES ---
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]); 
  const [loading, setLoading] = useState(true);

  // --- 2. ADD NEW FETCH FUNCTION FOR TRENDING MOVIES ---
  const getTrendingMovies = () => {
    return api.get("/trending/movie/week");
  };

  // --- 2. ADD NEW FETCH FUNCTION FOR TOP RATED MOVIES ---
  const getTopRatedModernMovies = () => {
    return api.get("/discover/movie", {
      params: {
        primary_release_year: currentYear,
        sort_by: "vote_average.desc",
        "vote_count.gte": 500,
      },
    });
  };

  // --- 2. ADD NEW FETCH FUNCTION FOR UPCOMING MOVIES ---
  const getUpcomingMovies = () => {
    return api.get("/movie/upcoming");
  };


  // --- 3. ADD NEW FETCH FUNCTION FOR ALL MOVIES ---
  const getAllMovies = async () => {
    setLoading(true);
    try {
      // --- ADD TO PROMISE.ALL ---
      const [trendingRes, topRatedRes, upcomingRes] = await Promise.all([
        getTrendingMovies(),
        getTopRatedModernMovies(),
        getUpcomingMovies(), 
      ]);


      // --- SET STATE VARIABLES ---
      setTrendingMovies(trendingRes.data.results.filter((movie) => movie));
      setTopRatedMovies(topRatedRes.data.results.filter((movie) => movie));
      setUpcomingMovies(upcomingRes.data.results.filter((movie) => movie)); 
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
    }
    setLoading(false);
  };

  // --- 4. ADD USEEFFECT TO FETCH MOVIES WHEN PAGE LOADS IT WORK ONLY ONCE---
  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    
    <>
    {/* --- 5. ADD LOADING STATE --- */}
      {loading ? (
        <p className="text-gray-400 flex justify-center items-center h-[60dvh] text-2xl md:text-3xl font-bold">Loading all movies...</p>
      ) : (
        <>
          {/* Section 1: Trending */}
          <section>
            <HeroCarousel movies={trendingMovies.slice(0, 5)}/>
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
              {trendingMovies.slice(0, 10).map((movie) => (
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