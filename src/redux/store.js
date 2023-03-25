import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { productsReducer } from "./productSlice";
import { postsReducer } from "./postsSlice";
import { basketReducer } from "./basketSlice";

const productsConfig = {
  key: "qwe228",
  storage,
  whitelist: ["products"]
};

const basketConfig = {
  key: "basket",
  storage,
};

export const store = configureStore({
  reducer: {
    products: persistReducer(productsConfig, productsReducer),
    basket: persistReducer(basketConfig, basketReducer),
    postsData: postsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
