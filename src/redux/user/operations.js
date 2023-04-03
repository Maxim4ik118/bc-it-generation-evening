import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactsAPI, UserAPI } from "../../services/contactsAPI";

export const requestRegister = createAsyncThunk(
  "user/register",
  async (formData, thunkAPI) => {
    try {
      const response = await UserAPI.register(formData);
      response?.token && localStorage.setItem("token", response.token);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestLogin = createAsyncThunk(
  "user/login",
  async (formData, thunkAPI) => {
    try {
      const response = await UserAPI.login(formData);
      response?.token && localStorage.setItem("token", response.token);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestLogout = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const response = await UserAPI.logout();
      localStorage.removeItem("token");

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
