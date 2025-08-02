import { PlusCircle } from "lucide-react";

// Just render the icon in a span — the parent <button> is what actually handles clicks
const AddButton = () => (
  <span className="inline-flex items-center justify-center text-[var(--color-text-neutral)]">
    <PlusCircle size={20} strokeWidth={2} aria-hidden="true" />
  </span>
);

export default AddButton;
