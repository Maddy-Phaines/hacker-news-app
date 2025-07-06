import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
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
const SelectCategory = ({ categories, selected, onSelect }) => {
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
    <HorizontalScroller className="py-2">
      <ButtonGroup className="flex">
        {TAGS.map((tag) => (
          <Button
            aria-pressed={tag.id === activeTag}
            key={tag.id}
            onClick={() => handleClick(tag.id)}
            variant={tag.id === activeTag ? "default" : "ghost"}
          >
            {tag.label}
          </Button>
        ))}
      </ButtonGroup>
    </HorizontalScroller>
  );
};

export default SelectCategory;
