import React, { useContext, useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";

// import Details from "./components/Details/Details";
import Loader from "./components/Loader/Loader";
// import ProductForm from "./components/ProductForm/ProductForm";
// import ProductList from "./components/ProductList/ProductList";

import { requestPostComments, requestPosts } from "./services/api";
import { DetailsContext } from "./context/DetailsContext";

import {
  CommentsList,
  ListsContainer,
  PostsList,
  StyledNavLink,
} from "./App.styled";
import "./App.css";
import HomePage from "./pages/HomePage";
import SearchPostsPage from "./pages/SearchPostsPage";
import PostsPage from "./pages/PostsPage";
import PostDetailsPage from "./pages/PostDetailsPage";

// const productsData = [
//   {
//     id: "3", // "3" !== "2" - true
//     title: "Tacos With Lime M",
//     price: 5.85,
//     discount: 15,
//   },
//   {
//     id: "1", // "1" !== "2" - true
//     title: "Tacos With Lime XXL",
//     price: 10.99,
//     discount: 30,
//   },
//   {
//     id: "2", // "2" !== "2" - false
//     title: "Tacos With Lime XL",
//     price: 6.99,
//     discount: false,
//   },
// ];

/* 

Компонент перемальовується(рендериться) коли:
1. В ньому змінився стейт(setState)
2. В нього прийшли нові пропси

*/

/*
Робота з Маршрутеризацією:
1. Розбити наш додаток на сторінки (pages), 
  та створити відповідні компоненти сторінок
2. Обгорнути весь додаток <App /> в компонент 
  BrowserRouter, та не забути додати basename 
  перед деплоєм на гітхаб
3. Прописати навігацію на інші сторінки з допомогою
  Link | NavLink
4. Прописати маршрути Route під відповідні адреси
  та підставити відповідні компоненти.
5. Ми маємо згенерувати унікальні маршрути для наших сутностей
6. Потрібно прописати шаблон адреси для Route, який буде реагувати
   на динамічні параметри -> path="/posts/:postId", де postId - динамічний
   параметр
*/

const App = () => {
  return (
    <div className="App">
      <nav>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/search">Search Post</StyledNavLink>
        <StyledNavLink to="/posts">All Posts</StyledNavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPostsPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:postId/*" element={<PostDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
