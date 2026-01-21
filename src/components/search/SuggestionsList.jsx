// components/SuggestionsList.jsx
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery as setSearchQuery,
  selectSearchTag,
} from "../../features/search/searchSlice";
import { Search } from "lucide-react";

export default function SuggestionsList({ query = "" }) {
  const debouncedQuery = useDebounce(query.trim(), 400);
  const dispatch = useDispatch();
  const tag = useSelector(selectSearchTag);
  const [_, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // … your debouncedQuery, router + Redux hooks …

  const { data: suggestions = [], isFetching } = useQuery({
    queryKey: ["suggestions", debouncedQuery],
    queryFn: async () => {
      const url = new URL("https://hn.algolia.com/api/v1/search");
      url.searchParams.set("query", debouncedQuery);
      url.searchParams.set("hitsPerPage", 5);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const json = await res.json();
      // pull just the titles (or URLs, whatever)
      return json.hits.map((h) => h.title);
    },
    enabled: debouncedQuery.length > 0,
    staleTime: 5 * 60_000,
    keepPreviousData: true,
  });

  const pick = (term) => {
    dispatch(setSearchQuery(term));
    setSearchParams({ q: term, cat: tag }, { replace: true });
    navigate(`/search?q=${encodeURIComponent(term)}&cat=${tag}`);
  };

  if (isFetching && suggestions.length === 0) {
    return <p className="p-4 text-sm text-gray-500">Loading…</p>;
  }
  if (debouncedQuery && suggestions.length === 0) {
    return (
      <p className="p-4 text-sm text-gray-500">
        No matches for “{debouncedQuery}”
      </p>
    );
  }

  // …render loading / empty / list UI…
  return (
    <ul
      className="mt-0 
    max-h-64 
    overflow-auto"
    >
      {suggestions.map((term) => (
        <li
          key={term}
          onClick={() => pick(term)}
          className="cursor-pointer 
          text-[var(--color-text-neutral-2)] 
          px-4 py-2"
        >
          <div className="flex gap-[var(--gap-c-xs)]">
            <button
              type="submit"
              aria-label="Submit search"
              className="text-gray-500 hover:text-gray-700"
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
            <span className="text-12 line-clamp-1 md:line-clamp-2">{term}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
