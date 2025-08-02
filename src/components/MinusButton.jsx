import { MinusCircle } from "lucide-react";

// Just render the icon in a span — the parent <button> is what actually handles clicks
const MinusButton = () => (
  <span className="inline-flex items-center justify-center text-[var(--color-text-neutral)]">
    <MinusCircle size={20} strokeWidth={2} aria-hidden="true" />
  </span>
);

export default MinusButton;
