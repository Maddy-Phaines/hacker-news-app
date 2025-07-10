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
import Sidebar from "./SidebarA";
import BackButton from "./BackButton";
import SuggestionsList from "./SuggestionsList";
import TrendingList from "./TrendingList";
import TrendingRail from "./TrendingRail";
import ThemeToggle from "./ThemeToggle";
import { XCircle } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AppTooltip from "./AppTooltip";
import Fade from "@mui/material/Fade";

const SearchBarPage = () => {
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

  const goBack = () => navigate("/");
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

  const clear = () => {
    setInput("");
    dispatch(setSearchQuery(""));
    setSearchParams({ q: "", cat: tag }, { replace: true });
  };

  const isEmpty = input.trim().length === 0;

  return (
    <div className="min-h-screen bg-[#000]">
      <div className="px-[1rem] bg-[var(--color-bg)]">
        <div className="py-1">
          <div className="flex">
            <div
              className="flex justify-center items-center 
          h-[56px] w-full max-w-[750px]"
            >
              <div
                className="inline-flex
        px-[0.375rem] 
      ml-[1rem] 
      mr-[0.5rem] 
      items-center
      justify-center"
              >
                <BackButton onClick={goBack} />
              </div>
              <div className="relative flex-1">
                <AppTooltip
                  title="Toggle dark mode"
                  placement="bottom"
                  arrow
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                >
                  <input
                    type="text"
                    name="s"
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search Hacker News"
                    aria-label="Search Hacker News"
                    className="w-full h-12 py-5 pl-10 pr-4 
            rounded-[24px]
            cursor-pointer
           hover:bg-[var(--color-bg-neutral)] border 
           border-[var(--color-border)]
           text-[var(--color-text)]
           placeholder-[var(--color-text-muted)]
           focus:outline-none focus:ring-1 
           focus:ring-blue-400 focus:ring-opacity-80
            focus:ring-offset-0 focus:ring-offset-white"
                  ></input>
                </AppTooltip>

                <button
                  type="submit"
                  aria-label="Submit search"
                  onClick={runSearch}
                  className="
                  absolute left-3 
                  -translate-y-1/2 
                  top-1/2
                  text-[var(--color-icon-blue)]
                  hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
                {/* Clear button: only when there’s text */}
                {input.length > 0 && (
                  <button
                    type="button"
                    onClick={clear}
                    className="
            absolute right-2
            top-1/2 transform -translate-y-1/2
            text-[var(--color-text-muted)] hover:text-[var(--color-text)]
            p-1 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
            <span className="flex items-center justify-center flex-1">
              <ThemeToggle />
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-b-[1.25rem] bg-[var(--color-bg)]">
        {isEmpty ? <TrendingRail /> : <SuggestionsList query={input} />}
      </div>
    </div>
  );
};

export default SearchBarPage;
