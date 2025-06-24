// ButtonGroup.jsx
import clsx from "clsx";

/**
 * ButtonGroup – groups multiple buttons with consistent layout.
 */
const ButtonGroup = ({
  children,
  orientation = "horizontal", // "horizontal" | "vertical"
  align = "start", // "start" | "center" | "end"
  spacing = "gap-2", // e.g. "gap-2", "gap-4"
  className,
}) => {
  const isVertical = orientation === "vertical";

  return (
    <div
      role="group"
      className={clsx(
        "flex",
        isVertical ? "flex-col" : "flex-row",
        {
          "items-start": align === "start",
          "items-center": align === "center",
          "items-end": align === "end",
        },
        spacing,
        className
      )}
    >
      {children}
    </div>
  );
};

export default ButtonGroup;
