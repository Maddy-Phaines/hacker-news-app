/* Search input (optional advanced component if you want separate search control) */
/* Optional separation */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setQuery as setSearchQuery,
  fetchSearch,
} from "../features/search/searchSlice";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const runSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    dispatch(setSearchQuery(trimmed)); // store the search term in Redux
    dispatch(fetchSearch({ append: false })); // thunk read state.search.query
    navigate("/search");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      runSearch();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search stories, comments..."
        className="w-full pl-10 pr-4 py-2
          border border-gray-300
          rounded-full
          focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={runSearch}
        aria-label="Search"
        className="absolute left-3 top-1/2 transform -translate-y-1/2
          text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
