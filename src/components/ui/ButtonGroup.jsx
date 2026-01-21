// ButtonGroup.jsx

/**
 * ButtonGroup – groups multiple buttons with consistent layout.
 */
const ButtonGroup = ({ children }) => {
  return (
    <div
      role="group"
      className="whitespace-nowrap shadow-[var(--shadow-below)]"
    >
      {children}
    </div>
  );
};

export default ButtonGroup;
