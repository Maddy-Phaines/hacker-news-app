import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import {
  setQuery as setSearchQuery,
  selectSearchQuery,
  selectSearchTag,
} from "../features/search/searchSlice";
import PageContainer from "./PageContainer";
import BackButton from "./BackButton";
import SuggestionsList from "./SuggestionsList";
import TrendingRail from "./TrendingRail";
import ThemeToggle from "./ThemeToggle";
import { XCircle } from "lucide-react";
import { SearchIcon } from "lucide-react";

const SearchBarPage = () => {
  /* hooks and state */
  const dispatch = useDispatch();
  const storedQuery = useSelector(selectSearchQuery);
  const tag = useSelector(selectSearchTag);
  const [input, setInput] = useState(storedQuery);
  const [open, setOpen] = useState(false);

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
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* ─── HEADER ─────────────────────────────── */}
      <header
        className="w-full bg-[var(--color-bg)] 
      border-b border-[var(--color-border)] outline sticky 
      z-30 h-[var(--header-height)] flex items-center"
      >
        <div className="w-full mx-auto px-4">
          <div
            className="flex items-center 
          h-[56px] justify-between"
          >
            {/* ← Left slot */}
            <div className="flex items-center space-x-3 border hidden lg:flex">
              <a href="/" className="inline-flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--color-bg-pasta)] flex items-center justify-center">
                  <span className="font-bold text-[var(--color-contrast)]">
                    HN
                  </span>
                </div>
              </a>
            </div>

            {/* ← Center slot */}
            <div
              className="flex items-center 
              justify-center
              flex-1
              space-x-1"
            >
              <BackButton onClick={goBack} />

              <div
                className="relative flex flex-1
                outline w-full max-w-[750px]
                lg:max-w-[600px] 
                        shadow-custom-glow
                        rounded-[1.25rem]
                        "
              >
                <input
                  type="search"
                  value={input}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setOpen(true)}
                  placeholder="Search Hacker News"
                  aria-label="Search Hacker News"
                  className="w-full
                    h-10 px-4 pl-10 
                    pr-10
                    rounded-[24px]
                    bg-[var(--color-bg-neutral)]
                    hover:bg-[var(--color-bg-neutral)]
                    border border-[var(--color-border)]
                    text-[var(--color-text)]
                    placeholder-[var(--color-text-muted)]
                    focus:outline-none 
                    focus:ring-3
                    focus:ring-[var(--color-btn-bg)]
                  "
                />

                <button
                  type="button"
                  onClick={runSearch}
                  aria-label="Submit search"
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                >
                  <SearchIcon />
                </button>
                {input && (
                  <button
                    onClick={clear}
                    aria-label="Clear search"
                    className="absolute right-3 
                      top-1/2 -translate-y-1/2"
                  >
                    <XCircle
                      className="h-5 w-5 
                      text-[var(--color-text-muted)]"
                    />
                  </button>
                )}

                {open && (
                  <div
                    className="absolute outline
                    scrollable
                    inset-x-0
                    top-full
                    bg-[var(--color-bg)]
                    rounded-[1.25rem]
                    shadow-custom-shadow
                    overflow-auto
                    z-[999]
                    shadow-lg
                    max-h-96 
                    md:max-h-[800px]
                   p-4"
                  >
                    {/* ─── BODY ─────────────────────────────── */}
                    <PageContainer
                      className="flex 
                    flex-col"
                    >
                      <main
                        className="flex-1 
                        shadow-custom-glow
                        max-h-[calc(100vh 
                        - var(--header-height)] 
                        
                        
                        "
                      >
                        {input.trim() === "" ? (
                          <TrendingRail
                            className={`divide-y divide-gray-700`}
                          />
                        ) : (
                          <SuggestionsList query={input} />
                        )}
                      </main>
                    </PageContainer>
                  </div>
                )}
              </div>
            </div>

            {/* ← Right slot */}
            <div className="items-center hidden lg:flex">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default SearchBarPage;
