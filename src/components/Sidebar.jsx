// components/Sidebar.jsx
export default function Sidebar({ children }) {
  return (
    <aside
      className="
        p-3
        border-t border-[var(--color-border)]
        sticky top-[57px]
        bg-[var(--color-sidebar)]
        /* …any other layout/theming you need… */
      "
    >
      {children}
    </aside>
  );
}
