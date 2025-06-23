import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPostDetail = createAsyncThunk(
  "postDetail/fetch",
  async (postID, { rejectWithValue }) => {
    try {
      const url = `https://hn.algolia.com/api/v1/items/${postID}`;

      console.log("Fetching detail:", url);

      const response = await fetch(url);
      if (!response.ok) {
        console.error("Non-200 response", response.status);
        return rejectWithValue("error message");
      }
      const data = await response.json();
      console.log("Detail response payload:", data);
      // don’t assume data.hits exists here!
      return data; // for now just return the whole object
    } catch (err) {
      console.error("Thunk caught error:", err);
      return rejectWithValue(err.message);
    }
  }
);

const initialDetailState = {
  status: "idle",
  data: null,
  error: null,
};

const postDetailSlice = createSlice({
  name: "postDetail",
  initialState: initialDetailState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPostDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPostDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("Fetch failed", action.error);
      });
  },
});

export default postDetailSlice.reducer;

export const selectPostDetailError = (state) => state.postDetail.error;
export const selectPostDetailStatus = (state) => state.postDetail.status;
export const selectPostDetailData = (state) => state.postDetail.data;
