import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setIsLoading, setPosts, setError, setDetails, setComments } =
  postsSlice.actions;

export const postsReducer = postsSlice.reducer;
