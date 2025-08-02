// src/components/HorizontalScroller.jsx
import { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function HorizontalScroller({
  children,
  chevronSize = 24,
  className,
}) {
  const scroller = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // mouse / touch down
  const onDragStart = (clientX) => {
    setDragging(true);
    setStartX(clientX - scroller.current.offsetLeft);
    setScrollLeft(scroller.current.scrollLeft);
  };

  const onMouseDown = (e) => onDragStart(e.pageX);
  const onTouchStart = (e) => onDragStart(e.touches[0].pageX);

  // mouse / touch move
  const onMouseMove = (e) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.pageX - scroller.current.offsetLeft;
    const walk = x - startX;
    scroller.current.scrollLeft = scrollLeft - walk;
  };
  const onTouchMove = (e) => {
    if (!dragging) return;
    const x = e.touches[0].pageX - scroller.current.offsetLeft;
    const walk = x - startX;
    scroller.current.scrollLeft = scrollLeft - walk;
  };

  // end drag
  const endDrag = () => setDragging(false);

  // programmatic scroll
  const scrollBy = (delta) =>
    scroller.current.scrollBy({ left: delta, behavior: "smooth" });

  return (
    <div className="relative flex items-center md:hidden">
      {/* Left chevron */}
      <div className="pb-[1rem] ml-[12px] mr-[16px] min-w-max">
        <button
          onClick={() => scrollBy(-100)}
          className="absolute left-0 
        top-1/2 -translate-y-1/2 z-10 
        bg-transparent
        "
        >
          <ChevronLeftIcon size={chevronSize} />
        </button>
      </div>

      {/* The scroll container */}
      <div
        ref={scroller}
        className="flex space-x-2 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
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

      {/* Right chevron */}
      <div className="flex items-center pb-[1rem] ml-[12px] mr-[16px] min-w-max">
        <button
          onClick={() => scrollBy(100)}
          className="absolute right-0 
        top-1/2 -translate-y-1/2 z-10 
        bg-transparent"
        >
          <ChevronRightIcon size={chevronSize} />
        </button>
      </div>
    </div>
  );
}
