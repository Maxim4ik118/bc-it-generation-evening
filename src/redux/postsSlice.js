import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestPostComments, requestPostDetails, requestPosts, requestPostsBySearchTerm } from "../services/api";

export const fetchPosts = createAsyncThunk(
  "posts/getAll",
  async (_, thunkAPI) => {
    // dispatch({ type: "posts/getAll/pending" });

    try {
      const posts = await requestPosts();

      return posts;
      // dispatch({ type: "posts/getAll/fullfilled", payload: posts });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
      // dispatch({ type: "posts/getAll/rejected", payload: error.message });
    }
  }
);

export const fetchPostDetails = createAsyncThunk(
  "posts/getPostDetails",
  async (postId, thunkAPI) => {
    try {
      const details = await requestPostDetails(postId);

      return details;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchComments = createAsyncThunk(
  "posts/getComments",
  async (postId, thunkAPI) => {
    try {
      const comments = await requestPostComments(postId);

      return comments;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPostsBySearchTerm = createAsyncThunk(
  "posts/fetchPostsBySearchTerm",
  async (queryValue, thunkAPI) => {
    try {
      const post = await requestPostsBySearchTerm(queryValue); 

      return post;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


/*
А якщо використовувати RTK Query то async thunk вже не потрібна?


*/

const initialState = {
  posts: null,
  comments: null,
  postDetails: null,
  error: null,
  isLoading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setDetails: (state, { payload }) => {
      state.postDetails = payload;
    },
    setComments: (state, { payload }) => {
      state.comments = payload;
    },
  },
  extraReducers: (builder) =>
    builder
     // ---- GET ALL POSTS ----
      .addCase(fetchPosts.pending, handlePendingReducer)
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.posts = payload;
      })
      .addCase(fetchPosts.rejected, handleRejectedReducer)

      // --- GET POST DETAILS -----
      .addCase(fetchPostDetails.pending, handlePendingReducer)
      .addCase(fetchPostDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.postDetails = payload;
      })
      .addCase(fetchPostDetails.rejected, handleRejectedReducer)

      // --- GET POST COMMENTS -----
      .addCase(fetchComments.pending, handlePendingReducer)
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.comments = payload;
      })
      .addCase(fetchComments.rejected, handleRejectedReducer)

       // --- GET POSTS BY SEARCH TERM -----
       .addCase(fetchPostsBySearchTerm.pending, handlePendingReducer)
       .addCase(fetchPostsBySearchTerm.fulfilled, (state, { payload }) => {
         state.isLoading = false;
         state.posts = [payload];
       })
       .addCase(fetchPostsBySearchTerm.rejected, handleRejectedReducer)
      ,
});


const handlePendingReducer = (state) => {
  state.isLoading = true;
  state.error = null;
}
const handleRejectedReducer = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
}

export const { setIsLoading, setPosts, setError, setDetails, setComments } =
  postsSlice.actions;

export const postsReducer = postsSlice.reducer;
