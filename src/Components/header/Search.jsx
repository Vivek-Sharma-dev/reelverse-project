import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Search = () => {
  const navigate = useNavigate();
  const inputRef = useRef();


  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    if (query) {
      navigate(`/search?q=${query}`);
      e.target.reset();

      if (inputRef.current) inputRef.current.blur();
    }
  };
  return (
    <form
      className="absolute top-20   w-fit  sm:top-0 md:w-auto sm:relative"
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
  );
};

export default Search;
