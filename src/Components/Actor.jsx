import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const Actor = ({ actor }) => {
  const imageUrl = actor.profile_path
    ? `${IMAGE_BASE_URL}${actor.profile_path}`
    : "https://placehold.co/600x281/0f172a/ffffff?text=No+Image";
  return (
    <Link to={`/person/${actor.id}`} className="text-center text-white group">
      <div className="relative w-30 md:w-48 h-30 md:h-48 mx-auto">
        <img
          src={imageUrl}
          alt={actor.name}
          className="w-full h-full object-cover rounded-full shadow-lg transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onError = null;
            e.target.src =
              "https://placehold.co/600x281/0f172a/ffffff?text=No+Image";
          }}
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold truncate group-hover:text-blue-400">
        {actor.name}
      </h3>
      <p className="text-lg md:text-xl text-gray-400 italic">
        {" "}
        {actor.known_for_department}
      </p>
    </Link>
  );
};

export default Actor;
