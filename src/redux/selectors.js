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

// ----- Products Selectors --------------------------------

export const selectBasketItems = (state) => state.basket.basketItems;
export const selectPromoCode = (state) => state.basket.promocode;
export const selectItemsQuantity = createSelector(
  selectBasketItems,
  (items) => items.length
);
export const selectFinalPrice = createSelector(selectBasketItems, (items) =>
  items
    .reduce((acc, item) => {
      if (item.discount) {
        // 100$ | 50% -> 0 + 100 - (100 * 0.5) -> 50$
        // 100$ | 5% -> 0 + 100 - (100 * 0.05) -> 95$
        acc =
          acc +
          (item.price - (item.price * item.discount) / 100) * item.quantity;
        return acc;
      }
      acc = acc + item.price * item.quantity;
      return acc;
    }, 0)
    .toFixed(1)
);


// ----- User Selectors --------------------------------
export const selectUserStatus = (state) => state.user.status;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

// ----- Contacts Selectors --------------------------------
export const selectContactsStatus = (state) => state.contacts.status;
export const selectContacts = (state) => state.contacts.contacts;