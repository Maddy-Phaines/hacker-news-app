import { ArrowLeft } from "lucide-react";
import AppTooltip from "./AppTooltip";
import Fade from "@mui/material/Fade";

function BackButton({ onClick }) {
  return (
    <AppTooltip
      title="Go back"
      placement="bottom"
      arrow
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 600 }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label="Go back"
        className="
        cursor-pointer
        p-2
        rounded-full
        bg-transparent
        hover:bg-[rgba(59,130,246,0.2)]
        hover:shadow-apple-glow
        transition duration-200
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-400
        focus-visible:ring-offset-2
        inline-flex items-center 
        justify-center"
      >
        <ArrowLeft
          className="
        h-6 w-6 
        text-[var(--color-icon-blue)]"
        />
      </button>
    </AppTooltip>
  );
}

export default BackButton;
