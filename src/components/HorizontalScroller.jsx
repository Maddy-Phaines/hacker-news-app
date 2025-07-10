import React, { useRef, useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function HorizontalScroller({ children, className = "" }) {
  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // check if we can scroll
  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  const scrollBy = (distance) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: distance, behavior: "smooth" });
    // give it a moment to finish
    setTimeout(updateArrows, 300);
  };

  return (
    <div className={`relative ${className}`}>
      {canScrollLeft && (
        <button
          className="absolute
          bg-[var(--color-bg)] 
          inline-flex 
          items-center
          justify-center
          left-0 
          top-0 
          h-full 
          px-[0.75rem] 
          z-10"
          onClick={() => scrollBy(-scrollerRef.current.clientWidth / 2)}
        >
          <MdChevronLeft size={24} />
        </button>
      )}

      <div
        ref={scrollerRef}
        onScroll={updateArrows}
        className="overflow-x-auto 
        whitespace-nowrap 
        scroll-smooth 
        hide-scrollbar"
      >
        {children}
      </div>

      {canScrollRight && (
        <button
          className="absolute
          bg-[var(--color-bg)]
          inline-flex 
          items-center
          justify-center right-0 top-0 h-full px-2 z-10"
          onClick={() => scrollBy(scrollerRef.current.clientWidth / 2)}
        >
          <MdChevronRight size={24} />
        </button>
      )}
    </div>
  );
}
