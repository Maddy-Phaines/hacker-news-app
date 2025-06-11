import { Search } from "lucide-react";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
/* Sticky top bar with app name, search, and category filter*/

function Header() {
  return (
    <header className="w-full bg-white">
      {/* ─────────────── Row 1: brand + search ─────────────── */}
      <div className="w-full py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center space-x-6">
          {/* Brand on the far left */}
          <h1 className="text-2xl font-bold">Hacker News Reader</h1>

          {/* SearchBar immediately to its right */}
          <div className="flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* if you have other header icons/buttons (profile, etc.), add here */}
          {/* <ProfileMenu /> */}
        </div>
      </div>

      {/* Category Nav */}
      {/* ─────────────── Row 2: HN nav links ─────────────── */}
      <div className="w-full border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex space-x-8 text-sm font-medium text-gray-600">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-black border-b-2 border-blue-600 pb-2"
                  : "hover:text-black"
              }
            >
              Top
            </NavLink>
            <NavLink to="/ask" className="hover:text-black">
              Ask HN
            </NavLink>
            <NavLink to="/show" className="hover:text-black">
              Show HN
            </NavLink>
            <NavLink to="/polls" className="hover:text-black">
              Polls
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
