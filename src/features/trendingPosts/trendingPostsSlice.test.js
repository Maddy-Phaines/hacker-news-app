import reducer, {
  initialTrendingState,
  resetTrending,
} from "./trendingPostsSlice";

describe("trendingPostsSlice", () => {
  it("Should return the initial state when passed an empty action", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialTrendingState);
  });

  it("Should return initial state on resetTrending", () => {
    const modified = {
      items: [1, 2, 3],
      status: "failed",
      error: "oops",
    };
    expect(reducer(modified, resetTrending())).toEqual(initialTrendingState);
  });
});
