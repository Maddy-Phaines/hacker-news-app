import { MinusCircle } from "lucide-react";

const MinusButton = () => {
  return (
    <button
      type="button"
      className="p-2 rounded-full 
      bg-transparent 
      text-[var(--color-text-neutral)] 
      inline-flex items-center 
      justify-center
      cursor-pointer"
      aria-label="Add item"
    >
      <MinusCircle size={20} strokeWidth={2} />
    </button>
  );
};

export default MinusButton;
