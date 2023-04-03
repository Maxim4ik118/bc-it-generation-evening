import { createSlice } from "@reduxjs/toolkit";
import {
  requestAddContact,
  requestLogin,
  requestLogout,
  requestRegister,
  requestUserContacts,
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null, // optional for those who uses redux-persist
  contacts: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  // Ім'я слайсу
  name: "user",
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {},
  extraReducers: (builder) =>
    builder
      // ------------ Register user ----------------
      .addCase(requestRegister.pending, pendingReducer)
      .addCase(requestRegister.fulfilled, (state, { payload }) => {
        state.status = "resolved";
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(requestRegister.rejected, errorReducer)
      // ------------ Login user ----------------
      .addCase(requestLogin.pending, pendingReducer)
      .addCase(requestLogin.fulfilled, (state, { payload }) => {
        state.status = "resolved";
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(requestLogin.rejected, errorReducer)
      // ------------ User logOut ----------------
      .addCase(requestLogout.pending, pendingReducer)
      .addCase(requestLogout.fulfilled, (state) => {
        state.status = "resolved";
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
      })
      .addCase(requestLogout.rejected, errorReducer)
      // ------------ Get user contacts ----------------
      .addCase(requestUserContacts.pending, pendingReducer)
      .addCase(requestUserContacts.fulfilled, (state, { payload }) => {
        state.status = "resolved";
        state.contacts = payload;
      })
      .addCase(requestUserContacts.rejected, errorReducer)
      // ------------ Add user contact ----------------
      .addCase(requestAddContact.pending, pendingReducer)
      .addCase(requestAddContact.fulfilled, (state, { payload }) => {
        state.status = "resolved";
        state.contacts = [...state.contacts, payload];
      })
      .addCase(requestAddContact.rejected, errorReducer),
});

function pendingReducer(state) {
  state.error = null;
  state.status = "pending";
}
function errorReducer(state, { payload }) {
  state.status = "rejected";
  state.error = payload;
}
// Генератори екшенів
// export const {} = userSlice.actions;
// Редюсер слайсу
export const userReducer = userSlice.reducer;
