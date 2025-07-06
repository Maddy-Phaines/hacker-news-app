import React from "react";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";

import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import HorizontalScroller from "./HorizontalScroller";

const menuItems = [
  { to: "/", label: "Top" }, // ← use "/" so it goes back to your Top-stories route
  { to: "/best", label: "Best" },
  { to: "/ask", label: "Ask HN" },
  { to: "/show", label: "Show HN" },
  { to: "/polls", label: "Polls" },
];

export default function Header() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "rounded-[16px] px-[0.825rem] py-[0.4rem] text-[var(--color-btn-text)] border-b-2 border-[var(--color-border)]"
      : "rounded-[16px] px-[0.825rem] py-[0.4rem] hover:text-[var(--color-btn-bg)] hover:bg-[var(--color-btn-text)]";

  return (
    <header className="w-full bg-[--bg] text-[--copy]">
      {/* ─── Row 1: Brand + Search + ThemeToggle ─── */}
      <div className="w-full py-4">
        <div className="mx-auto px-4 flex items-center justify-between space-x-6">
          <a href="/" className="font-bold leading-tight">
            Hacker
            <br />
            News Reader
          </a>

          <div className="flex-1 flex justify-center">
            <SearchBar />
          </div>

          <ThemeToggle />
        </div>
      </div>

      {/* ─── Row 2: Category Nav ─── */}
      <div className="w-full border-t border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 w-full">
          {/* Mobile: scrollable with chevrons */}
          <HorizontalScroller className="md:hidden py-2">
            {menuItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </HorizontalScroller>

          {/* Desktop: regular inline nav */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium py-2">
            {menuItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
