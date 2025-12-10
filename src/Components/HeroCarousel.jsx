import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original"; // Base URL for backdrop images

const HeroSlide = ({ movie }) => {
  return (
    <>
      <Link
        to={`/movie/${movie.id}`}
      >
        <div className="relative w-full h-[50vh] md:h-[70vh]">
          <img
            src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover object-top"
          />

          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900/50 via-transparent to-transparent" />

          <div className="absolute w-full bottom-5 flex justify-center md:bottom-15 p-4 z-10  ">
            <div className="w-4/6 flex flex-col items-center gap-2 md:gap-5">
              <h2 className="text-2xl text-center md:text-5xl font-bold text-white line-clamp-2 md:line-clamp-none">
                {movie.title}
              </h2>
              <p className="text-gray-400 text-sm line-clamp-2 md:line-clamp-none md:text-xl text-center">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

const HeroCarousel = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="w-full mb-12">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        effect="fade"
        className="w-full h-full px-50"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <HeroSlide movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
