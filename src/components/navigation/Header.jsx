import { NavLink } from "react-router-dom";
import clsx from "clsx";
import SearchButton from "../ui/SearchButton";
import ThemeToggle from "../ui/ThemeToggle";
import HorizontalScroller from "../HorizontalScroller";
import AppTooltip from "../ui/AppTooltip";

const menuItems = [
  { to: "/", label: "Top" },
  { to: "/best", label: "Best" },
  { to: "/ask", label: "Ask HN" },
  { to: "/show", label: "Show HN" },
  { to: "/polls", label: "Polls" },
];

export default function Header() {
  const containerClasses = "max-w-6xl mx-hidden";
  const innerPadding = "mx-[24px] py-4 md:max-w-[680px]";

  const row1Classes = clsx(
    "h-[var(--header-height)] border-b border-[var(--color-border)]",
    "text-[--copy] z-20 flex items-center justify-between",
    "px-[var(--spacing-page-x)] bg-[var(--color-bg)]",
  );

  const row2Classes = clsx(
    "w-full sticky top-0 left-0 right-0 z-[999]",
    "bg-[var(--color-bg)] border-b border-[var(--color-border)]",
  );

  const navLinkBase =
    "rounded-[16px] text-[14px] px-[0.825rem] py-[0.4rem] text-[var(--color-bg-tertiary)] font-medium";
  const linkClass = ({ isActive }) =>
    clsx(navLinkBase, {
      "hover:text-[var(--color-btn-bg)] hover:bg-[var(--color-btn-text)]":
        !isActive,
      "font-semibold": isActive,
    });

  const groupGap = "flex items-center gap-x-[var(--gap-c-xs)]";

  return (
    <>
      {/* Row 1: Logo, Search, Theme Toggle */}
      <header className={clsx(row1Classes)} aria-label="Main navigation">
        <div className={clsx(groupGap, "mx-[14px]")}>
          <AppTooltip content="Go to homepage" side="bottom">
            <a href="/" className="font-bold leading-tight">
              <div
                className="flex items-center justify-center 
            rounded-full w-10 h-10 bg-[var(--color-bg-pasta)]"
              >
                <span className="text-[var(--color-contrast)]">HN</span>
              </div>
            </a>
          </AppTooltip>
        </div>
        <div className="flex">
          <div className="flex">
            <ThemeToggle />
          </div>
          <SearchButton />
        </div>
      </header>

      {/* Row 2: Category Nav */}
      <nav className={clsx(row2Classes)} aria-label="Category navigation">
        <div className={containerClasses}>
          <div className={innerPadding}>
            {/* Mobile: scrollable with chevrons */}
            <HorizontalScroller>
              <div className="whitespace-nowrap flex items-center">
                {menuItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={linkClass}>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </HorizontalScroller>
            {/* Desktop: regular inline nav */}
            <div className="hidden md:flex space-x-8 text-sm font-medium py-2">
              {menuItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={linkClass}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
