import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basketItems: [],
  promocode: {
    isUsed: false,
    type: "percent", // "fixed" | "percent"
    name: null,
  },
};

const basketSlice = createSlice({
  // Ім'я слайсу
  name: "basket",
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {
    addBasketItem(state, { payload }) {
      const isItemAlreadyAdded = state.basketItems.some(
        (item) => item.id === payload.id
      );

      if (isItemAlreadyAdded) {
        state.basketItems = state.basketItems.map((item) => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        state.basketItems = [...state.basketItems, { ...payload, quantity: 1 }];
      }
    },
    removeBasketItem(state, { payload }) {
      state.basketItems = state.basketItems.filter(
        (item) => item.id !== payload
      );
    },
    decrementQuantity(state, { payload }) {
      state.basketItems = state.basketItems.map((item) => {
        if (item.id === payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
    incrementQuantity(state, { payload }) {
      state.basketItems = state.basketItems.map((item) => {
        if (item.id === payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
  },
});

// Генератори екшенів
export const {
  addBasketItem,
  removeBasketItem,
  decrementQuantity,
  incrementQuantity,
} = basketSlice.actions;
// Редюсер слайсу
export const basketReducer = basketSlice.reducer;
