import { createSelector } from "@reduxjs/toolkit";

// ----- Posts Selectors --------------------------------
export const selectComments = (state) => state.postsData.comments;
export const selectIsLoadingPosts = (state) => state.postsData.isLoading;
export const selectPostsError = (state) => state.postsData.error;
export const selectPostDetails = (state) => state.postsData.postDetails;
export const selectPosts = (state) => state.postsData.posts;

// ----- Products Selectors --------------------------------

export const selectShowDetails = (state) => state.products.showDetails;
export const selectFilterTerm = (state) => state.products.filterTerm;
export const selectProducts = (state) => state.products.products;

export const selectFilteredProducts = createSelector(
  selectFilterTerm,
  selectProducts,
  (filterTerm, products) => {
    return products.filter(
      (
        product // derived data
      ) => product.title.toLowerCase().includes(filterTerm.trim().toLowerCase())
    );
  }
);
