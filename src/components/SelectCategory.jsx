import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearch,
  setTag,
  selectSearchQuery,
  selectSearchStatus,
} from "../features/search/searchSlice";

const TAGS = [
  { id: "story", label: "Stories" },
  { id: "comment", label: "Comments" },
  { id: "ask_hn", label: "AskHn" },
  { id: "show_hn", label: "ShowHn" },
  { id: "poll", label: "Polls" },
];
const SelectCategory = () => {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);
  const status = useSelector(selectSearchStatus);
  const activeTag = useSelector((state) => state.search.tag);

  // Triggers search whenever query or tag changes (300ms debounce)
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const timerId = setTimeout(() => {
      if (trimmed) dispatch(fetchSearch({ append: false }));
    }, 300);

    return () => clearTimeout(timerId);
  }, [query, activeTag, dispatch]);

  const btnBase =
    "border border-[1px] px-3 py-1 rounded rounded-full cursor-pointer";
  const activeCls =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 bg-gray-200 text-[var(--bg)]";
  const idleCls = "border-[var(--copy)] text-[var(--copy)]";

  return (
    <div className="flex gap-2">
      {TAGS.map((tag) => (
        <button
          aria-pressed={tag.id === activeTag}
          key={tag.id}
          onClick={() => {
            if (tag.id === activeTag) return;
            dispatch(setTag(tag.id));
            if (query.trim()) dispatch(fetchSearch({ append: false }));
          }}
          className={`${btnBase} 
            ${tag.id === activeTag ? activeCls : idleCls}`}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
};

export default SelectCategory;
