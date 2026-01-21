export default function Sidebar({ children }) {
  return (
    <aside
      className="
        sticky top-[var(--header-height)]
        border-t border-[var(--color-border)]
        px-4
        pb-4
        z[999]
      "
      aria-label="Sidebar content"
    >
      {children}
    </aside>
  );
}
