import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import api from "../../api/tmdbApi";
import { X } from "lucide-react";
const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef();
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const searchMovies = async (query) => {
    try {
      const response = await api.get(`/search/multi`, {
        params: {
          query,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Error searching movies:", error);
      throw error;
    }
  };
  const [results, setResults] = useState([]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        const data = await searchMovies(query);
        setResults(data.slice(0, 20)); // Sirf top 5 results dikhao
      } else {
        setResults([]);
      }
    }, 300); // Debouncing taaki har keystroke par API call na ho

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const filteredResults = results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv",
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    if (query) {
      navigate(`/search?q=${query}`);
      e.target.reset();
      setIsSuggestionsVisible(false);

      if (inputRef.current) inputRef.current.blur();
    }
  };
  return (
    <div className="lg:relative">
      <form
        className="absolute top-20 left-4 w-fit  sm:top-0 md:w-auto sm:relative"
        onSubmit={handleSearch}
      >
        <span className="relative inline-flex  rounded-full">
          <button
            type="submit"
            className="text-md md:text-lg text-gray-400 hover:text-white bg-gray-800 ps-5 rounded-l-full"
          >
            <FaSearch />
          </button>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Movies..."
            name="search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onClick={() => setIsSuggestionsVisible(true)}
            className="text-white bg-gray-800 py-2 md:py-3 px-4 w-50 focus:outline-none placeholder:text-md placeholder:font-semibold md:placeholder:md:text-lg"
          />
          <button
            type="submit"
            className="border-l hover:text-blue-500 transition-colors duration-300 border-blue-300 px-3 font-bold md:text-lg text-md bg-gray-600 rounded-r-full text-white hover:bg-gray-700"
          >
            Search
          </button>
        </span>
      </form>
      {isSuggestionsVisible && (
        <>
          {filteredResults.length > 0 ? (
            <div className="absolute top-36 inset-0 lg:left-0 lg:top-full mt-2  no-scrollbar bg-zinc-700/90  backdrop-blur border border-zinc-800 rounded-2xl shadow-2xl z-100 h-80 overflow-auto no-scrollbar mx-4">
                <div className="absolute w-full right-2 text-end pt-2">
                  <button onClick={() => setIsSuggestionsVisible(false)} className=" p-2 bg-red-400 rounded-full hover:bg-red-500 active:scale-95">
                  <X />
                  </button>
                </div>
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    navigate(`/${item.media_type || "movie"}/${item.id}`);
                    setQuery("");
                    setResults([]);
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-zinc-800 cursor-pointer border-b border-zinc-800/50 last:border-none "
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                    className="w-10 h-14 object-cover rounded-md"
                    alt=""
                  />
                  <div>
                    <p className="text-xs font-bold truncate w-40">
                      {item.title || item.name}
                    </p>
                    <p className="text-[10px] text-zinc-500">
                      {item.release_date?.split("-")[0] || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            query.length > 2 && (
              <div>
                <div className="absolute top-full mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-100">
                  <div className="flex items-center gap-3 p-3 hover:bg-zinc-800 cursor-pointer border-b border-zinc-800/50 last:border-none">
                    <p className="text-sm text-zinc-500">No results found</p>
                  </div>
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default Search;
