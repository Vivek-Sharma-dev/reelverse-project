import React from 'react';
import { IoClose } from 'react-icons/io5';

const VideoModal = ({ videoId, closeModal }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/70 backdrop-blur-sm"
      onClick={closeModal} 
    >
      <div 
        className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 z-10 p-1 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
        >
          <IoClose size={28} />
        </button>

        {/* YouTube <iframe> */}
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoModal;