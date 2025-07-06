/* Search input (optional advanced component if you want separate search control) */
/* Optional separation */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import {
  setQuery as setSearchQuery,
  selectSearchQuery,
  selectSearchTag,
} from "../features/search/searchSlice";

const SearchBar = () => {
  /* hooks and state */
  const dispatch = useDispatch();
  const storedQuery = useSelector(selectSearchQuery);
  const tag = useSelector(selectSearchTag);
  const [input, setInput] = useState(storedQuery);

  const [_, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  /* keep local input synced if some other component changes the query */
  useEffect(() => {
    setInput(storedQuery);
  }, [storedQuery]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value); // update locally
    dispatch(setSearchQuery(value)); // update Redux
    // keep URL query string current
    setSearchParams({ q: value, cat: tag }, { replace: true });
  };
  /* User "commit" search: Enter key or click */
  const runSearch = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    dispatch(setSearchQuery(trimmed)); // update Redux and URL for final time with clean value
    /* Write the same parameters into ?q=&cat= on our current URL
       before navigating, so back-button history is tidy. */
    setSearchParams({ q: trimmed, cat: tag }, { replace: true });

    const target = `/search?q=${encodeURIComponent(trimmed)}&cat=${tag}`;

    /* only navigate if I'm not already on /search */
    if (location.pathname !== "/search") {
      navigate(target);
    } else {
      navigate(target, { replace: true });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") runSearch();
  };

  return (
    <div className="relative flex w-full max-w-[750px]">
      <input
        type="text"
        name="s"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search"
        aria-label="Search Hacker News"
        className="w-full h-10 pl-10 pr-4 rounded-[20px]
           bg-[var(--color-bg-neutral)] border border-[var(--color-border)]
           text-[var(--color-text)]
           placeholder-[var(--color-text-muted)]
           focus:outline-none focus:ring-2 focus:ring-[var(--color-btn-bg)]"
      ></input>

      <button
        type="submit"
        aria-label="Submit search"
        onClick={runSearch}
        className="absolute left-3 -translate-y-1/2 top-1/2
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
