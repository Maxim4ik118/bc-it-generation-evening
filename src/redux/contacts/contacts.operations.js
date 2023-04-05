import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactsAPI } from "../../services/contactsAPI";


export const requestUserContacts = createAsyncThunk(
    "contacts/getAll",
    async (_, thunkAPI) => {
      try {
        const response = await ContactsAPI.getContacts();
  
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

export const requestAddContact = createAsyncThunk(
    "contacts/addContact",
    async (formData, thunkAPI) => {
      try {
        const response = await ContactsAPI.addContact(formData);
  
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const requestDeleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
      try {
        const response = await ContactsAPI.deleteContact(contactId);
  
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);
