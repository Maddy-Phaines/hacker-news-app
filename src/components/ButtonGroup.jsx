// ButtonGroup.jsx
import clsx from "clsx";
import { wrap } from "framer-motion";

/**
 * ButtonGroup – groups multiple buttons with consistent layout.
 */
const ButtonGroup = ({ children }) => {
  return (
    <div role="group" className="whitespace-nowrap">
      {children}
    </div>
  );
};

export default ButtonGroup;
