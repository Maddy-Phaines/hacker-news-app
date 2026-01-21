import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import AppTooltip from "./AppTooltip";
// SearchButton with read-only input. Reroutes user to SearchBarPage
// onClick/focus. Import into and use in Header. Hide input on v small
// screens and show only the search icon
const SearchButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/searchpage");
  };

  return (
    <div
      className="relative flex 
    items-center"
    >
      <AppTooltip content="Go to search page" side="bottom">
        {/* 1) Always-visible icon button */}
        <button
          type="button"
          onClick={handleClick}
          aria-label="Go to search page"
          className="flex items-center justify-center 
  rounded-full w-10 h-10 
  bg-[var(--color-bg-pasta)]
  text-[var(--color-contrast)]
  hover:border-[shadow-apple-glow]
  transition duration-200
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-blue-400
  focus-visible:ring-offset-2
  cursor-pointer"
        >
          <SearchIcon
            className="
          h-5 
          w-5
          "
          />
        </button>
      </AppTooltip>
    </div>
  );
};

export default SearchButton;
