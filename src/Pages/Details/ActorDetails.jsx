import{ useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../../Components/MovieCard";
import api from "../../api/tmdbApi";
import loadingAnimation from "../../assets/animations/loading.json";
import Lottie from "lottie-react";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const ActorDetails = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullBio, setShowFullBio] = useState(false);

  const getActorDetails = useCallback( async () => {
    setLoading(true);
    try {
      const res = await api.get(`/person/${id}`, {
        params: {
          append_to_response: "combined_credits",
        },
      });

      setActor(res.data);

      const allCredits = res.data.combined_credits.cast.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
      setCredits(allCredits);

      const filteredAndStored = allCredits
        .filter((items) => items.poster_path)
        .sort((a, b) => b.popularity - a.popularity);

      setCredits(filteredAndStored);
    } catch (error) {
      console.log(`Error fetching actor details: ${error}`);
    }
    setLoading(false);
  }, [id]);
  useEffect(() => {
    getActorDetails();
  }, [getActorDetails]);

  if (loading) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    );
  }

  if (!actor) {
    return (
      <p className="h-[60vh] w-full flex justify-center items-center text-lg font-bold">
        Actor Not Found
      </p>
    );
  }

  const biography = actor.biography || "No biography available.";
  const showReadMore = biography.length > 300;
  return (
    <div className="container m-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Actor Image */}
        <div className="w-full md:w-1/3 md:max-w-sm shrink-0">
          <img
            src={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${actor.profile_path}`
                : "https://placehold.co/600x900/0f172a/ffffff?text=No+Image"
            }
            alt={actor.name}
            className="rounded-lg shadow-2xl w-full"
          />
        </div>

        {/* Right Column: Actor Details */}
        <div className="md:w-2/3 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{actor.name}</h1>

          {/* Biography */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Biography</h2>
            <p className="text-gray-300 italic text-lg leading-snug">
              {showFullBio ? biography : `${biography.substring(0, 300)}...`}

              {showReadMore && (
                <button
                  className="text-blue-400 font-semibold ml-2"
                  onClick={() => setShowFullBio(!showFullBio)}
                >
                  {showFullBio ? "Read Less" : "Read More"}
                </button>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Filmography */}
      <div className="mt-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Known For
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-4">
          {credits.map((movie) => {
            return (
              <MovieCard key={`${movie.id}-${movie.credit_id}`} movie={movie} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;
