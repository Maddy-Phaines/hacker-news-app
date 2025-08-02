// src/components/PostsTabs.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchPostsByTag,
  selectPostsByTag,
  selectPostsStatusByTag,
  selectPostsErrorByTag,
} from "../features/posts/postsSlice";
import { selectCurrentTag } from "../features/ui/uiSlice";
import useNProgress from "../hooks/useNProgress";

import ErrorMessage from "./ErrorMessage";
import PostList from "./PostList";

export default function PostsTabs() {
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

  return (
    <>
      {useNProgress(status === "loading")}
      {status === "failed" && <ErrorMessage message={error} />}
      {status === "succeeded" && <PostList posts={posts} />}
    </>
  );
}
