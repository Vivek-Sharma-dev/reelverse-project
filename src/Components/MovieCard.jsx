import { Link } from "react-router-dom";

// Base URL for movie images
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const mediaType = movie.media_type || (movie.title ? "movie" : "tv");

  const imageUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://placehold.co/600x281/0f172a/ffffff?text=No+Information";

    const badgeText = mediaType === 'tv' ? "SERIES" : "MOVIE"
    const badgeColor = mediaType === 'tv' ? "bg-blue-500" : "bg-purple-500"
  return (
    <Link
      to={`/${mediaType}/${movie.id}`}
      className="group bg-slate-800 rounded-lg overflow-hidden mb-4 drop-shadow-cyan-400 shadow-xl transform transition-all duration-300  hover:shadow-white/20"
    >
      <div className="relative overflow-hidden ">
        <img
          src={imageUrl}
          alt={title}
          className="w-full object-cover aspect-video group-hover:scale-110 transition-all duration-300"
          onError={(e) => {
            e.target.onError = null;
            e.target.src =
              "https://placehold.co/600x281/0f172a/ffffff?text=No+Image";
          }}
        />

        <div className={`absolute top-1 md:top-2 right-1 md:right-2 ${badgeColor} text-white text-xs md:text-lg italic font-bold px-2 py-1 rounded-md z-10 `}>
          {badgeText}
        </div>
        <div className="absolute bottom-0 p-3 bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0">
          <p className="text-gray-300 text-sm line-clamp-4">
            {movie.overview ? movie.overview : "No overview available"}
          </p>
        </div>
      </div>
      <div className="p-3">
        <div className="">
          <h2 className="text-md md:text-2xl md:mb-2 font-bold truncate text-white">
            {title}
          </h2>
          <p className="text-gray-400 text-sm italic md:text-lg">
            {releaseDate ? releaseDate.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;