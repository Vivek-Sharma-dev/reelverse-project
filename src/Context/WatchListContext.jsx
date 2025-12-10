import { createContext, useContext, useEffect, useState } from "react";

// Create a context
const WatchListContext = createContext();
export const useWatchList = () => {
  return useContext(WatchListContext);
};

// Create a provider component
export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState(() => {
    const savedWatchList = localStorage.getItem("watchList");
    return savedWatchList ? JSON.parse(savedWatchList) : [];
  });
  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const removeMovie = (movieId) => {
    setWatchList((prevWatchList) =>
      prevWatchList.filter((movie) => movie.id !== movieId)
    );
  };

  const addMovie = (movie) => {
    if(!isMovieInWatchList(movie.id)){
      setWatchList((prevWatchList) => [...prevWatchList, movie]);
    }
  }
  const isMovieInWatchList = (movieId) =>{
    return watchList.some((movie)=> movie.id === movieId)
  }

  const value = {
    watchList,
    addMovie,
    removeMovie,
    isMovieInWatchList,
  }
  return (
    // Provide the context value to child components
    <WatchListContext.Provider value={value}>
        {children}
    </WatchListContext.Provider>
  )
};

export default WatchListContext;
