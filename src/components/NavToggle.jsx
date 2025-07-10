import { Bars3Icon } from "@heroicons/react/24/outline";

function NavToggle({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open menu"
      className="px-[var(--gap-c-xs)] cursor-pointer"
    >
      <Bars3Icon className="h-[var(--icon-height)] w-6 text-[var(--color-text-neutral)]" />
    </button>
  );
}
export default NavToggle;
