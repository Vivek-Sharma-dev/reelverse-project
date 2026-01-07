import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original"; // Base URL for backdrop images

const HeroSlide = ({ movie }) => {
  return (
    <>
      <Link to={`/movie/${movie.id}`}>
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
  const isMobile = window.innerWidth <= 768;
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  if (!movies || movies.length === 0) return null;

  return (
    <div className="w-full mb-12 relative">
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
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;

              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
        effect="fade"
        speed={800}
        className="w-full h-full px-50"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="pb-10">
            <HeroSlide movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="">
        <button
          ref={prevRef}
          className="hero-prev bg-white/20 top-[35%] hover:bg-white/40 active:scale-90 lg:top-1/2 z-50 rounded-full p-3 absolute left-5 lg:left-20 cursor-pointer transition-all duration-300"
        >
          <ChevronsLeft size={isMobile ? 30 : 40} />
        </button>
        <button
          ref={nextRef}
          className="hero-next bg-white/20 top-[35%] hover:bg-white/40 active:scale-90 lg:top-1/2 z-50 rounded-full p-3 absolute right-5 lg:right-20 cursor-pointer transition-all duration-300"
        >
          <ChevronsRight size={isMobile ? 30 : 40} />
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;
