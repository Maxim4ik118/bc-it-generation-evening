import { createSlice } from "@reduxjs/toolkit";
import {
  requestLogin,
  requestLogout,
  requestRefreshUser,
  requestRegister,
} from "./user.operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null, // optional for those who uses redux-persist
  isLoggedIn: false,
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
        state.isLoggedIn = true;
      })
      .addCase(requestRegister.rejected, errorReducer)

      // ------------ Login user ----------------

      .addCase(requestLogin.pending, pendingReducer)
      .addCase(requestLogin.fulfilled, (state, { payload }) => {
        state.status = "resolved";
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
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
        state.isLoggedIn = false;
      })
      .addCase(requestLogout.rejected, errorReducer)

      // ------------ User refresh ----------------

      .addCase(requestRefreshUser.pending, pendingReducer)
      .addCase(requestRefreshUser.fulfilled, (state, { payload }) => {
        state.status = "resolved";
        state.user = {
          name: payload.name,
          email: payload.email,
        };
        state.isLoggedIn = true;
      })
      .addCase(requestRefreshUser.rejected, errorReducer),
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
