import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function HorizontalScroller({
  children,
  chevronSize = 24,
  className = "",
}) {
  const scroller = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);
  const [atLeftEdge, setAtLeftEdge] = useState(true);
  const [atRightEdge, setAtRightEdge] = useState(true);

  const updateEdges = () => {
    const el = scroller.current;
    if (!el) return;
    const epsilon = 1; // guards against rounding / fractional pixels
    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    setAtLeftEdge(el.scrollLeft <= 0);
    setAtRightEdge(el.scrollLeft >= maxScrollLeft - epsilon);
  };

  // mouse / touch down
  const onDragStart = (clientX) => {
    setDragging(true);
    const el = scroller.current;
    setStartX(clientX - el.offsetLeft);
    setScrollLeftStart(el.scrollLeft);
  };

  const onMouseDown = (e) => onDragStart(e.pageX);
  const onTouchStart = (e) => onDragStart(e.touches[0].pageX);

  // shared drag move
  const handleDragMove = (clientX) => {
    if (!dragging) return;
    const el = scroller.current;
    const x = clientX - el.offsetLeft;
    const walk = x - startX;
    el.scrollLeft = scrollLeftStart - walk;
    updateEdges();
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    e.preventDefault();
    handleDragMove(e.pageX);
  };
  const onTouchMove = (e) => handleDragMove(e.touches[0].pageX);

  // end drag
  const endDrag = () => setDragging(false);

  // programmatic scroll
  const scrollBy = (delta) => {
    const el = scroller.current;
    el.scrollBy({ left: delta, behavior: "smooth" });
    // 'scroll' will fire and call updateEdges
  };

  const onScroll = () => updateEdges();

  useEffect(() => {
    updateEdges(); // on mount
    const onResize = () => updateEdges();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className={`relative flex items-center md:hidden ${className}`}>
      {/* Left chevron — visible when not at far-left */}
      <div className="pb-[1rem] ml-[12px] mr-[16px] min-w-max">
        <button
          onClick={() => scrollBy(-100)}
          disabled={atLeftEdge}
          aria-hidden={atLeftEdge}
          tabIndex={atLeftEdge ? -1 : 0}
          className={[
            "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-transparent pb-[1rem] ml-[8px] mr-[16px]",
            "transition-opacity duration-150",
            atLeftEdge
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto",
          ].join(" ")}
        >
          <ChevronLeftIcon size={chevronSize} />
        </button>
      </div>

      {/* Scroll container */}
      <div
        ref={scroller}
        className="flex space-x-2 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={endDrag}
      >
        {children}
      </div>

      {/* Right chevron — visible when not at far-right */}
      <div className="flex items-center pb-[1rem] ml-[12px] mr-[16px] min-w-max">
        <button
          onClick={() => scrollBy(100)}
          disabled={atRightEdge}
          aria-hidden={atRightEdge}
          tabIndex={atRightEdge ? -1 : 0}
          className={[
            "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-transparent pb-[1rem] ml-[19px] mr-[16px]",
            "transition-opacity duration-150",
            atRightEdge
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto",
          ].join(" ")}
        >
          <ChevronRightIcon size={chevronSize} />
        </button>
      </div>
    </div>
  );
}
