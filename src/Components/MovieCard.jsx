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

    
    const badgeText = mediaType === 'tv' ? "SR" : "M"
    const badgeColor = mediaType === 'tv' ? "bg-gradient-to-br from-blue-500 to-black shadow-[inset_0px_30px_60px_-12px_rgba(50,50,93,0.25),inset_0px_18px_36px_-18px_rgba(0,0,0,0.3)]-500" : "bg-gradient-to-br from-purple-500 to-red-600 shadow-[inset_0px_30px_60px_-12px_rgba(50,50,93,0.25),inset_0px_18px_36px_-18px_rgba(0,0,0,0.3)]-500"
  return (
    <Link
      to={`/${mediaType}/${movie.id}`}
      className="group bg-slate-800 rounded-lg overflow-hidden mb-4 drop-shadow-cyan-400 shadow-xl transform transition-all duration-300 hover:-translate-y-2 "
    >
      <div className="relative overflow-hidden ">
        <img
          src={imageUrl}
          alt={title}
          className="w-full object-cover aspect-video group-hover:scale-110 transition-all duration-500"
          onError={(e) => {
            e.target.onError = null;
            e.target.src =
              "https://placehold.co/600x281/0f172a/ffffff?text=No+Image";
          }}
        />
        
        


        <div className={`absolute top-1 md:top-2 right-1 md:right-2 ${badgeColor} text-white text-xs md:text-lg italic font-bold px-2 py-1 rounded-md z-10 lg:opacity-0 lg:scale-0 lg:group-hover:opacity-100 lg:group-hover:scale-100 lg:translate-x-10 lg:group-hover:translate-x-0 transition-all duration-500`}>
          {badgeText}
        </div> 
        <div className="absolute bottom-0 p-3 bg-black/40 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0">
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