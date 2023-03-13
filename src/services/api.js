//https://jsonplaceholder.typicode.com/posts/

import axios from "axios";

// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const requestPosts = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");

  return data;
};

export const requestPostsBySearchTerm = async (searchTerm) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${searchTerm}`);

  return data;
};

export const requestPostDetails = async (postId) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);

  return data;
};

export const requestPostComments = async (postId) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  
    return data;
};
