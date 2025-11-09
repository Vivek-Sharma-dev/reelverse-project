import React, { useEffect, useState, useRef, useCallback } from "react";
import api from "../api/tmdbApi";
import MovieCard from "../Components/MovieCard";
import HeroCarousel from "../Components/HeroCarousel";
import { MdError } from "react-icons/md";

const Hollywood = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [err, setErr] = useState(null);

  const observer = useRef();

  const lastElementRef = useCallback(
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

  const getHollywoodContent = async () => {
    setLoading(true);
    try {
      const [movieRes, tvRes] = await Promise.all([
        api.get("/discover/movie", {
          params: {
            with_origin_country: "US",
            sort_by: "popularity.desc",
            "vote_count.gte": 100,
            page: page,
          },
        }),
        api.get("/discover/tv", {
          params: {
            with_origin_country: "US",
            sort_by: "popularity.desc",
            "vote_count.gte": 100,
            page: page,
          },
        }),
      ]);

      const newMovies = movieRes.data.results.filter((item) => item);
      const newTvShows = tvRes.data.results.filter((item) => item);
      const combinedContent = [...newMovies, ...newTvShows];

      combinedContent.sort((a, b) => b.popularity - a.popularity);

      setContent((prevContent) => {
        const allContent = [...prevContent, ...combinedContent];
        const existingIds = new Set(prevContent.map((c) => c.id));
        const uniqueContent = allContent.filter((c) => !existingIds.has(c.id));
        return [...prevContent, ...uniqueContent];
      });

      setHasMore(newMovies.length > 0 || newTvShows.length > 0);
    } catch (error) {
      console.log(`error fetching Hollywood content: ${error}`);
      setErr(error.message || "Failed to fetch movies. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    getHollywoodContent();
  }, [page]);

  return (
    <div>
      <HeroCarousel movies={content.slice(0, 5)} />
      <div className="container mx-auto p-4 md:p-8">
        {loading && content.length === 0 ? (
          <p className="text-gray-400 flex justify-center items-center h-[60dvh] text-2xl md:text-3xl font-bold">
            Loading content...
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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              HollyWood (Movies & Series)
            </h1>
            <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-4">
              {content.map((item, idx) => {
                const uniqueKey = `${item.id}-${
                  item.media_type || (item.title ? "movie" : "tv")
                }`;
                if (content.length === idx + 1) {
                  return (
                    <div ref={lastElementRef} key={uniqueKey}>
                      <MovieCard movie={item} />
                    </div>
                  );
                } else {
                  return <MovieCard key={uniqueKey} movie={item} />;
                }
              })}
            </div>
          </>
        )}
        {loading && content.length > 0 && (
          <p className="text-gray-400 text-lg w-full text-center mt-8">
            Loading more content...
          </p>
        )}
      </div>
    </div>
  );
};

export default Hollywood;
