import { Search } from "lucide-react";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import SelectCategory from "./SelectCategory";

/* Sticky top bar with app name, search, and category filter*/

function Header() {
  return (
    <header className="w-full text-copy bg-[--bg] dark:bg-[--bg] text-[--copy]">
      {/* ─────────────── Row 1: brand + search ─────────────── */}
      <div className="w-full py-4">
        <div className="mx-auto px-4 flex items-center justify-between space-x-6">
          {/* Brand on the far left */}
          <div className="flex items-center gap-2">
            <div className="ml-3">
              <span className="font-bold">
                Hacker <br />
                News Reader
              </span>
            </div>

            {/* SearchBar immediately to its right */}
            <div className="flex-1 w-full">
              <SearchBar />
            </div>
          </div>
          {/* other header icons/buttons (profile, etc.) */}
          {/* <ProfileMenu /> */}
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Category Nav */}
      {/* ─────────────── Row 2: HN nav links ─────────────── */}
      <div
        className="w-full flex items-center border-t border-b border-muted text-copy 
      bg-surface"
      >
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex space-x-8 text-sm font-medium text-[#DBE4E9] pb-2 pt-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[var(--text-bright)] border-b-2 border-purple-600"
                  : "hover:text-[var(--text-bright)] hover:bg-btn dark:hover:bg-btn rounded-[16px] px-[0.825rem] py-[0.4rem]"
              }
            >
              Top
            </NavLink>
            <NavLink
              to="/ask"
              className="hover:text-[#FFFFFF] hover:bg-[#333D42] rounded-[16px] px-[0.825rem] py-[0.4rem]"
            >
              Ask HN
            </NavLink>
            <NavLink
              to="/show"
              className="hover:text-[#FFFFFF] hover:bg-[#333D42] rounded-[16px] px-[0.825rem] py-[0.4rem]"
            >
              Show HN
            </NavLink>
            <NavLink
              to="/polls"
              className="hover:text-[#FFFFFF] hover:bg-[#333D42] rounded-[16px] px-[0.825rem] py-[0.4rem]"
            >
              Polls
            </NavLink>
          </nav>
        </div>
        <div className="flex-1 max-w-md">
          <SelectCategory />
        </div>
      </div>
    </header>
  );
}

export default Header;
