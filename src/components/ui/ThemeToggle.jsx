import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import AppTooltip from "./AppTooltip";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = storedTheme === "dark";
    document.documentElement.classList.toggle("dark", prefersDark);
    setIsDark(prefersDark);
  }, []);
  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <div className="pl-[calc(var(--gap-c-xs) - 5px)]">
      <AppTooltip content="Toggle dark mode" side="bottom">
        <button
          type="button"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          className="
        p-3
        rounded-full
        bg-transparent
        hover:bg-[rgba(59,130,246,0.2)]
        hover:shadow-apple-glow
        transition duration-200
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-400
        focus-visible:ring-offset-2
        inline-flex items-center justify-center"
        >
          {isDark ? (
            <Sun
              onClick={toggleDarkMode}
              className="
              cursor-pointer 
              text-[var(--color-icon-blue)]"
            ></Sun>
          ) : (
            <Moon
              onClick={toggleDarkMode}
              className="
            cursor-pointer
            text-[var(--color-icon-blue)]"
            ></Moon>
          )}
        </button>
      </AppTooltip>
    </div>
  );
}
export default ThemeToggle;
