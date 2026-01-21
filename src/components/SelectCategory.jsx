import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import {
  setTag,
  selectSearchTag,
  selectSearchQuery,
  selectSearchStatus,
} from "../features/search/searchSlice";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import HorizontalScroller from "./HorizontalScroller";

const TAGS = [
  { id: "story", label: "Stories" },
  { id: "comment", label: "Comments" },
  { id: "ask_hn", label: "AskHn" },
  { id: "show_hn", label: "ShowHn" },
  { id: "poll", label: "Polls" },
];
const SelectCategory = ({
  categories,
  selected,
  onSelect,
  className,
  removeFirstButtonMargin = false,
}) => {
  const dispatch = useDispatch();
  const query = useSelector(selectSearchQuery);
  const status = useSelector(selectSearchStatus);
  const activeTag = useSelector(selectSearchTag);
  const [_, setParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (id) => {
    if (id === activeTag) return;

    dispatch(setTag(id));
    setParams({ q: query, cat: id }, { replace: true });

    if (query.trim() && location.pathname !== "/search") {
      navigate("/search");
    }
  };

  return (
    <>
      {/* Mobile: Scrolling layout */}
      <div className="block md:hidden">
        <HorizontalScroller>
          <ButtonGroup className="">
            {TAGS.map((tag, index) => (
              <div
                key={tag.id}
                className={clsx(
                  "inline-flex items-center min-w-max pb-[16px]",
                  removeFirstButtonMargin && index === 0
                    ? "ml-0 mr-[16px]"
                    : "mx-[16px]",
                  tag.id === activeTag &&
                    "border-b border-b-[var(--shadow-below-b)]"
                )}
              >
                <Button
                  onClick={() => handleClick(tag.id)}
                  variant={tag.id === activeTag ? "default" : "ghost"}
                >
                  {tag.label}
                </Button>
              </div>
            ))}
          </ButtonGroup>
        </HorizontalScroller>
      </div>

      {/* Desktop: Inline layout */}
      <div className="hidden md:flex space-x-8">
        <ButtonGroup className="">
          {TAGS.map((tag) => (
            <div
              key={tag.id}
              className={clsx(
                "inline-flex items-center min-w-max pb-[16px] mx-[16px]",
                {
                  "border-b border-b-[rgb(36, 36, 36)] border-[var(--color-accent)]":
                    tag.id === activeTag,
                }
              )}
            >
              <Button
                key={tag.id}
                onClick={() => handleClick(tag.id)}
                variant={tag.id === activeTag ? "default" : "ghost"}
              >
                {tag.label}
              </Button>
            </div>
          ))}
        </ButtonGroup>
      </div>
    </>
  );
};

export default SelectCategory;
