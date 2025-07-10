import React from "react";
import { NavLink } from "react-router-dom";
import SearchButton from "./SearchButton";
import ThemeToggle from "./ThemeToggle";
import HorizontalScroller from "./HorizontalScroller";
import NavToggle from "./NavToggle";
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
      ? "rounded-[16px] px-[0.825rem] py-[0.4rem]"
      : "rounded-[16px] px-[0.825rem] py-[0.4rem] hover:text-[var(--color-btn-bg)] hover:bg-[var(--color-btn-text)]";

  return (
    <header
      className="bg-[--bg] 
      text-[--copy] 
      px-header-gutter 
      -mx-header-gutter 
      [&>*:first-child]:mt-0 
      [&>*:last-child]:mb-0"
    >
      {/* ─── Row 1: Brand + Search + ThemeToggle ─── */}
      <nav
        className="w-full
        border-b border-[var(--color-border)]
        fixed 
        z-30 
        h-[var(--header-height)] 
        top-0 
        left-0 
        right-0
      flex
      h-[var(--header-height)] 
      px-[var(--spacing-page-x)] 
      justify-between 
      items-center"
      >
        <div
          className="flex 
        items-center
        gap-x-[var(--gap-c-xs)]"
        >
          <NavToggle />
          <a
            href="/"
            className="font-bold 
          leading-tight"
          >
            <div
              className="flex justify-center
            rounded-[624.9375rem]
            w-[40px] h-[40px] px-3
            bg-[var(--color-bg-pasta)]"
            >
              <div
                className="inline-flex items-center justify-center
              border text-[var(--color-contrast)]"
              >
                <span>H</span>
                <span>N</span>
              </div>
            </div>
          </a>
        </div>
        <div
          className="flex 
        items-center
        gap-x-[var(--gap-c-xs)]"
        >
          <div className="flex-1 flex">
            <SearchButton />
          </div>

          <ThemeToggle />
        </div>
      </nav>

      {/* ─── Row 2: Category Nav ─── */}
      <div className="w-full pt-[var(--header-height)]">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="pt-[1rem]">
            {/* Mobile: scrollable with chevrons */}
            <HorizontalScroller
              className="md:hidden 
              py-2"
            >
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
      </div>
    </header>
  );
}
