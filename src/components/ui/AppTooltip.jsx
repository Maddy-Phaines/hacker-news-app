// Accessible, reusable tooltip component using Radix UI and Tailwind CSS
import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";

/**
 * AppTooltip wraps any children with an accessible tooltip using Radix UI.
 * - Keyboard accessible
 * - ARIA-compliant
 * - Styled with Tailwind (customizable)
 *
 * @param {string} content - The tooltip text
 * @param {ReactNode} children - The element triggering the tooltip
 * @param {string} side - Tooltip placement (top, right, bottom, left)
 * @param {number} delayDuration - Delay before showing the tooltip (ms)
 */
const AppTooltip = ({
  content,
  children,
  side = "bottom",
  delayDuration = 300,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip.Provider delayDuration={delayDuration}>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            sideOffset={8}
            className="z-[999] rounded bg-gray-900 px-3 py-1.5 text-sm text-white shadow-md animate-fade-in 
            bg-black text-white text-sm px-2 py-1 rounded shadow"
            {...rest}
          >
            {content}
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default AppTooltip;
