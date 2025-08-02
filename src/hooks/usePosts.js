// src/hooks/usePosts.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsByTag,
  selectPostsByTag,
  selectPostsStatusByTag,
  selectPostsErrorByTag,
} from "../features/posts/postsSlice";
import { selectCurrentTag } from "../features/ui/uiSlice";

export function usePosts() {
  const dispatch = useDispatch();
  const currentTag = useSelector(selectCurrentTag);

  const posts = useSelector((state) => selectPostsByTag(state, currentTag));
  const status = useSelector((state) =>
    selectPostsStatusByTag(state, currentTag)
  );
  const error = useSelector((state) =>
    selectPostsErrorByTag(state, currentTag)
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPostsByTag(currentTag));
    }
  }, [currentTag, status, dispatch]);

  return { posts, status, error };
}
