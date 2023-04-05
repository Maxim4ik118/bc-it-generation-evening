import { createSlice } from "@reduxjs/toolkit";
import {
  requestAddContact,
  requestDeleteContact,
  requestUserContacts,
} from "./contacts.operations";

const initialState = {
  contacts: null,
  status: "idle",
  error: null,
};

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: "contacts",
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {},
  extraReducers: (builder) =>
    builder
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
        state.contacts = state.contacts === null ? [payload] : [...state.contacts, payload];
      })
      .addCase(requestAddContact.rejected, errorReducer)
      // ------------ Delete user contact ----------------

      .addCase(requestDeleteContact.pending, pendingReducer)
      .addCase(requestDeleteContact.fulfilled, (state, { payload }) => {
        state.status = "resolved";
        state.contacts = state.contacts.filter(contact => contact.id !== payload.id);
      })
      .addCase(requestDeleteContact.rejected, errorReducer),
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
export const contactsReducer = contactsSlice.reducer;
