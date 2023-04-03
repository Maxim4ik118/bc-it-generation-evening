import axios from "axios";

const $publicHost = axios.create({
  baseURL: "https://connections-api.herokuapp.com/",
});

const $privateHost = axios.create({
  baseURL: "https://connections-api.herokuapp.com/",
});

const authInterceptor = (config) => {
  config.headers["Authorization"] = localStorage.getItem("token");
  return config;
};

$privateHost.interceptors.request.use(authInterceptor);

/*
    const $privateHost = axios.create({
        baseURL: "https://connections-api.herokuapp.com/",
        headers: {
            "Authorization": localStorage.getItem('token')
        }
    });
*/

export const UserAPI = {
  login: async (formData) => {
    const { data } = await $publicHost.post("users/login", formData);

    return data;
  },
  register: async (formData) => {
    const { data } = await $publicHost.post("users/signup", formData);

    return data;
  },
  logout: async () => {
    const { data } = await $privateHost.post("users/logout");

    return data;
  },
  refresh: async () => {
    const { data } = await $privateHost.get("users/current");

    return data;
  },
};

export const ContactsAPI = {
  getContacts: async () => {
    const { data } = await $privateHost.get("contacts");

    return data;
  },
  addContact: async (formData) => {
    const { data } = await $privateHost.post("contacts", formData);

    return data;
  },
  deleteContact: async (contactId) => {
    const { data } = await $privateHost.delete(`contacts/${contactId}`);

    return data;
  },
};
