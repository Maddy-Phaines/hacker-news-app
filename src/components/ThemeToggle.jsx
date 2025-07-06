import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import Button from "./Button";

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
    <>
      {isDark ? (
        <Sun onClick={toggleDarkMode}></Sun>
      ) : (
        <Moon onClick={toggleDarkMode}></Moon>
      )}
    </>
  );
}
export default ThemeToggle;
