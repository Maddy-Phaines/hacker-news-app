// unit test that asserts searchSlice’s reducer returns initialState
// when given undefined state and an unknown action
import reducer, { initialState, resetSearch } from "./searchSlice";

describe("searchSlice", () => {
  it("Should return the initial state when passed an empty action", () => {
    const result = reducer(undefined, { type: "" });
    expect(result.toEqual(initialState));
  });

  it("Should return the initial state on resetSearch", () => {
    const modified = {
      ...initialState,
      query: "foo",
      hits: [{ objectID: "1" }],
    };
    const result = reducer(modified, resetSearch());
    expect(result).toEqual(initialState);
  });
});
