import { PlusCircle } from "lucide-react";
import { MinusCircle } from "lucide-react";
const AddButton = () => {
  return (
    <button
      type="button"
      className="p-2 rounded-full bg-transparent 
      text-[var(--color-text-neutral)] 
      inline-flex items-center 
      justify-center
      cursor-pointer"
      aria-label="Add item"
    >
      <PlusCircle size={20} strokeWidth={2} />
    </button>
  );
};

export default AddButton;
