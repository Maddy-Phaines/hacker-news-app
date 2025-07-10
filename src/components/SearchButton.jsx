import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
// SearchButton with read-only input. Reroutes user to SearchBarPage
// onClick/focus. Import into and use in Header. Hide input on v small
// screens and show only the search icon
const SearchButton = () => {
  const navigate = useNavigate();
  const go = () => {
    navigate("/searchpage");
  };

  return (
    <div className="relative flex items-center w-full max-w-[750px]">
      {/* 1) Always-visible icon button */}
      <button
        type="button"
        onClick={go}
        aria-label="Open search"
        className="p-[var(--gap-c-xs)]
        flex
        items-center
        justify-center
        max-w-[var(--icon-height)]
        text-[var(--color-text-muted)] 
        hover:text-[var(--color-text)]
        cursor-pointer
        focus:outline-none
        rounded-full
        bg-[var(--color-bg-neutral)]
        border border-[var(--color-border)]"
      >
        <div className="max-h-[var(--icon-height)]">
          <SearchIcon
            className="
          h-5 
          w-5
          cursor-pointer"
          />
        </div>
      </button>
    </div>
  );
};

export default SearchButton;
