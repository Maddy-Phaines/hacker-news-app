import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import Fade from "@mui/material/Fade";
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
      <AppTooltip
        title="Go to search page"
        placement="bottom"
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
      >
        {/* 1) Always-visible icon button */}
        <button
          type="button"
          onClick={handleClick}
          aria-label="Go to search page"
          className="flex items-center justify-center rounded-full w-10 h-10 bg-[var(--color-bg-pasta)]
        rounded-full
        bg-[var(--color-bg-pasta)]
        text-[var(--color-contrast)]
        hover:bg-[rgba(59,130,246,0.2)]
        hover:shadow-apple-glow
        transition duration-200
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-400
        focus-visible:ring-offset-2"
        >
          <SearchIcon
            className="
          h-5 
          w-5
          cursor-pointer"
          />
        </button>
      </AppTooltip>
    </div>
  );
};

export default SearchButton;
