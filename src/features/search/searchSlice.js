import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearch = createAsyncThunk(
  "search/searchPosts",
  async ({ append = false }, { getState, rejectWithValue }) => {
    // thunkAPI.getState() reads query, page, sortBy and hitsPerPage from the slice
    const { query, page, tag, hitsPerPage, sortBy } = getState().search;
    const nextPage = append ? page + 1 : 0;
    const endpoint = sortBy === "date" ? "search_by_date" : "search";
    const url = new URL(`https://hn.algolia.com/api/v1/${endpoint}?`);
    url.searchParams.set("query", query); // sets parameter and value
    url.searchParams.set("page", page);
    url.searchParams.set("hitsPerPage", hitsPerPage);
    if (tag !== "all") {
      url.searchParams.set("tags", tag);
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Server responded with a non-2xx status
        return rejectWithValue({
          code: "BAD_RESPONSE",
          message: `Server error (${response.status}): ${response.statusText}`,
          status: response.status,
        });
      }
      const data = await response.json();
      return {
        hits: data.hits,
        page: data.page,
        nbHits: data.nbHits,
        append,
      };
    } catch (err) {
      // Likely netork failure or CORS error
      return rejectWithValue({
        code: "NETWORK_ERROR",
        message: err.message || "Network error occurred",
      });
    }
  },
);

const initialState = {
  query: "", // most recent search term
  tag: "story",
  hits: [], // array of results
  page: 0, // current page index
  hitsPerPage: 10, // number of items to fetch per “load more”
  totalHits: 0, // Algolia’s nbHits → total matching items
  sortBy: "date", // or "relevance" / "points"
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null, // error message if fetch fails
  hasMore: true, // controls whether Algolia reports more pages
};

// slice here
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    /* …query/sortBy setters…*/
    setQuery(state, action) {
      state.query = action.payload;
      if (!action.payload.trim()) {
        state.hits = [];
        state.totalHits = 0;
        state.page = 0;
      }
    },
    setTag(state, action) {
      state.tag = action.payload;
      state.page = 0;
      state.hits = [];
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    resetSearch: () => initialState, // Reset to default state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        const { hits, page, nbHits, append } = action.payload;
        state.hits = append ? [...state.hits, ...hits] : hits;
        state.page = page;
        state.totalHits = nbHits;
        state.hasMore = state.hits.length < nbHits;
        state.status = "succeeded";
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || {
          code: "UNKNOWN ERROR",
          message: action.error.message,
        };
      });
  },
});

export const selectSearchQuery = (state) => state.search.query;
export const selectSearchHits = (state) => state.search.hits;
export const selectSearchStatus = (state) => state.search.status;
export const selectSearchTag = (state) => state.search.tag;
export const selectSearchError = (state) => state.search.error;
export const selectSearchErrorCode = (state) => state.search.error?.code;
export const selectSearchHasMore = (state) => state.search.hasMore;
export const selectSearchTotalHits = (state) => state.search.totalHits;
export const selectSearchPage = (state) => state.search.page;
export const selectSearchHitsPerPage = (state) => state.search.hitsPerPage;
export const selectSearchSortBy = (state) => state.search.sortBy;

export const { resetSearch, setQuery, setTag, setSortBy } = searchSlice.actions;

export default searchSlice.reducer;
