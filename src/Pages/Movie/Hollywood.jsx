import{ useEffect, useState, useRef, useCallback } from "react";
import api from "../../api/tmdbApi";
import MovieCard from "../../Components/MovieCard";
import HeroCarousel from "../../Components/HeroCarousel";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading.json";
import infinityLoading from '../../assets/animations/loadingInfinity.json'
import error from '../../assets/animations/Error.json'


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
        api.get("/movie/now_playing", {
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
          <p className="flex justify-center items-center h-[60dvh]">
            <Lottie
              animationData={loadingAnimation}
              loop={true}
            />
          </p>
        ) : err ? (
          // --- B. ERROR STATE ---
         <div>
           <Lottie animationData={error} loop={true} className="lg:h-[80vh]"/>
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
          <p className=" flex justify-center mt-8">
            <Lottie animationData={infinityLoading} loop={true} style={{width:"100px",background: "transparent"}}  />
          </p>
        )}
      </div>
    </div>
  );
};

export default Hollywood;
