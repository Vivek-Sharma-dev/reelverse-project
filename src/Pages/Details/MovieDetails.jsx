import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/tmdbApi";
import { FaPlay, FaPlus, FaCheck } from "react-icons/fa";
import { useWatchList } from "../../Context/WatchListContext";
import VideoModal from "../../Components/VideoModal";
import { MdAccessTime } from "react-icons/md";
import loadingAnimation from "../../assets/animations/loading.json";
import Lottie from "lottie-react";
// Base URL for movie images
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const InfoBar = ({ movie }) => {
  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="flex flex-wrap text-lg md:text-xl items-center gap-x-6 gap-y-2 text-gray-300 mb-6">
      {/* Release Date */}
      {movie.release_date && (
        <span className="font-semibold">
          {movie.release_date.split("_")[0]}
        </span>
      )}

      {/* Genres */}
      <div className="flex gap-2">
        {movie.genres.slice(0, 3).map((genre) => (
          <span key={genre.id} className="border-2 border-gray-500 rounded-full px-3 py-0.5 text-lg md:text-xl">
            {genre.name}
          </span>
        ))}
      </div>

      {/* Runtime */}
      {movie.runtime > 0 && (
        <span className="font-semibold flex items-center gap-1 text-lg md:text-xl">
          <MdAccessTime />
          {formatRuntime(movie.runtime)}
        </span>
      )}
    </div>
  );
};

const MovieDetails = () => {
  // States for movie details
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [crew, setCrew] = useState({});

  const { addMovie, removeMovie, isMovieInWatchList } = useWatchList();
  const [inWatchList, setInWatchList] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const [movieRes, videosRes, providersRes] = await Promise.all([
          api.get(`/movie/${id}`, {
            params: { append_to_response: "credits" },
          }),
          api.get(`/movie/${id}/videos`),
          api.get(`/movie/${id}/watch/providers`),
        ]);

        setMovie(movieRes.data);

        const director = movieRes.data.credits.crew.find(
          (person) => person.job === "Director"
        );
        const writer = movieRes.data.credits.crew.find(
          (person) => person.job === "Writer" || person.job === "Screenplay"
        );

        setCrew({ director, writer });

        const officialTrailer = videosRes.data.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        setTrailer(officialTrailer);

        // Save ALL provider info for India (IN)
        setProviders(providersRes.data.results.IN);

        setInWatchList(isMovieInWatchList(movieRes.data.id));
      } catch (error) {
        console.log(`Error fetching movie details: ${error}`);
      }
      setLoading(false);
    };

    getMovieDetails();
  }, [id, isMovieInWatchList]);
  const handleWatchListToggle = () => {
    if (inWatchList) {
      removeMovie(movie.id);
      setInWatchList(false);
    } else {
      addMovie(movie);
      setInWatchList(true);
    }
  };
  let uniqueProviders = [];
  if (providers) {
    const allProviderLinks = [
      ...(providers.flatrate || []),
      ...(providers.rent || []),
      ...(providers.buy || []),
    ];
    const providerMap = new Map();
    allProviderLinks.forEach((provider) => {
      providerMap.set(provider.provider_id, provider);
    });
    uniqueProviders = Array.from(providerMap.values());
  }

  const formatRating = (rating) => (rating * 10).toFixed(0);

  if (loading) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    );
  }
  if (!movie) {
    return (
      <div className="h-screen w-full flex justify-center items-center text-lg">
        Movie not found.
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden">
      {/* --- 1. Background Image --- */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center blur-lg opacity-70"
        style={{
          backgroundImage: `url(${BACKDROP_BASE_URL}${movie.backdrop_path})`,
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-slate-900/40" />

      {/* --- 2. Main Content (Wider Layout) --- */}
      <div className="relative z-10 p-4 md:p-12 lg:p-16">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* --- Left Column: Poster --- */}
            <div className="w-full md:w-1/2 md:max-w-sm shrink-0">
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="rounded-xl w-full shadow-2xl h-3/4 object-cover"
              />
            </div>

            {/* --- Right Column: Info --- */}
            <div className=" text-white overflow-hidden">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {movie.title}
              </h1>
              <p className="text-lg text-gray-300 italic mb-4">
                {movie.tagline}
              </p>

              <div className="flex items-center gap-6 mb-6">
                {/* --- Rating --- */}
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full text-xl font-bold shrink-0">
                  {formatRating(movie.vote_average)}%
                </div>
                {/* --- Trailer Button --- */}
                {trailer && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 text-lg font-semibold hover:text-blue-400 transition-colors"
                  >
                    <FaPlay /> Watch Trailer
                  </button>
                )}
                {/* --- WatchList Button --- */}
                <button
                  onClick={handleWatchListToggle}
                  className={`flex italic items-center gap-2 text-lg font-semibold px-4 py-2 rounded-lg transition-colors
                    ${
                      inWatchList
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                >
                  {inWatchList ? <FaCheck /> : <FaPlus />}
                  {inWatchList ? "In WatchList" : "Add to WatchList"}
                </button>
              </div>

              <h2 className="text-2xl font-bold mb-2">Overview</h2>
              <p className="text-gray-200 md:text-lg mb-6">{movie.overview}</p>
              <InfoBar movie={movie} />

              {/* --- "Where to Watch" --- */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-3">Where to Watch</h2>
                {uniqueProviders.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {uniqueProviders.map((provider) =>
                      providers.link ? (
                        <a
                          key={provider.provider_id}
                          href={providers.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Click to see options for ${provider.provider_name}`}
                        >
                          <img
                            src={`${IMAGE_BASE_URL}${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="w-12 h-12 rounded-lg transition-transform duration-200 hover:scale-110"
                          />
                        </a>
                      ) : (
                        <img
                          key={provider.provider_id}
                          src={`${IMAGE_BASE_URL}${provider.logo_path}`}
                          alt={provider.provider_name}
                          title={provider.provider_name}
                          className="w-12 h-12 rounded-lg"
                        />
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400">
                    No provider information available for this region.
                  </p>
                )}
              </div>

              {/* Crew */}
              <div className="flex gap-8 my-10">
                {crew.director && (
                  <div>
                    <h3 className="text-lg md:text-2xl  font-bold">Director</h3>
                    <p className="text-gray-300 md:text-xl">
                      {crew.director.name}
                    </p>
                  </div>
                )}

                {crew.writer && (
                  <div>
                    <h3 className="text-lg md:text-2xl  font-bold">Writer</h3>
                    <p className="text-gray-300 md:text-xl">
                      {crew.writer.name}
                    </p>
                  </div>
                )}
              </div>
              {/* Cast */}
              <h2 className="text-2xl font-bold mb-3">Top Cast</h2>
              <div className="flex flex-wrap gap-1 md:gap-5 p-2">
                {movie.credits.cast.slice(0, 10).map((actor) => (
                  <div
                    key={actor.cast_id}
                    className="text-center w-24 md:w-40 shrink-0 mb-4"
                  >
                    <Link to={`/person/${actor.id}`}>
                      <img
                        src={
                          actor.profile_path
                            ? `${IMAGE_BASE_URL}${actor.profile_path}`
                            : "https://placehold.co/200x300/0f172a/ffffff?text=N/A"
                        }
                        alt={actor.name}
                        className="w-20 h-20 md:w-30 md:h-40 object-cover rounded-full mx-auto mb-1 transition-transform duration-200 hover:scale-110"
                      />
                    </Link>
                    <p className="text-sm md:text-xl leading-5 font-semibold">
                      {actor.name}
                    </p>
                    <p className="text-xs  md:text-lg text-gray-400 italic">
                      {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Trailer Modal */}
      {showModal && trailer && (
        <VideoModal
          videoId={trailer.key}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default MovieDetails;
