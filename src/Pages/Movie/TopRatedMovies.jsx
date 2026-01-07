import { useEffect, useState, useRef, useCallback } from "react";
import api from "../../api/tmdbApi";
import MovieCard from "../../Components/MovieCard";
import loadingAnimation from "../../assets/animations/loading.json";
import Lottie from "lottie-react";
import infinityLoading from '../../assets/animations/loadingInfinity.json'


const TopRatedMovies = () => {
  const [content, setContent] = useState([]); 
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

  const getTopRatedContent = useCallback( async () => {
    setLoading(true);
    try {
      const movieParams = {
        sort_by: "vote_average.desc",
        "vote_count.gte": 500,
        page: page,
      };
      const tvParams = {
        sort_by: "vote_average.desc",
        "vote_count.gte": 500,
        page: page,
      };

      const [movieRes, tvRes] = await Promise.all([
        api.get("/discover/movie", { params: movieParams }),
        api.get("/discover/tv", { params: tvParams }),
      ]);

      const newMovies = movieRes.data.results
        .filter((item) => item)
        .map((m) => ({ ...m, media_type: "movie" }));

      const newTvShows = tvRes.data.results
        .filter((item) => item)
        .map((t) => ({ ...t, media_type: "tv" }));

      const combinedContent = [...newMovies, ...newTvShows];
      combinedContent.sort((a, b) => b.popularity - a.popularity);

      setContent((prevContent) => {
        const existingIds = new Set(
          prevContent.map(
            (c) => `${c.id}-${c.media_type || (c.title ? "movie" : "tv")}`
          )
        );
        const uniqueNewContent = combinedContent.filter(
          (c) =>
            !existingIds.has(
              `${c.id}-${c.media_type || (c.title ? "movie" : "tv")}`
            )
        );
        return [...prevContent, ...uniqueNewContent];
      });

      setHasMore(newMovies.length > 0 || newTvShows.length > 0);
    } catch (error) {
      console.log(`error fetching top rated: ${error}`);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    getTopRatedContent();
  }, [getTopRatedContent]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
        All Top Rated Movies
      </h1>
      {loading && content.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Lottie animationData={loadingAnimation} loop={true} />{" "}
        </div>
      ) : (
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-4">
          {content.map((movie, idx) => {
            if (content.length === idx + 1) {
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
      {loading && content.length > 0 && (
         <p className=" flex justify-center mt-8">
            <Lottie animationData={infinityLoading} loop={true} style={{width:"100px",background: "transparent"}}  />
          </p>
      )}
    </div>
  );
};

export default TopRatedMovies;
