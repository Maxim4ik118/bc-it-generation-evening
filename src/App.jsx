import React, { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { Loader } from "./components";

import {
  requestLogout,
  requestRefreshUser,
} from "./redux/user/user.operations";
import { selectIsLoggedIn, selectItemsQuantity } from "./redux/selectors";

import { StyledNav, StyledNavLink } from "./App.styled";
import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPostsPage = lazy(() => import("./pages/SearchPostsPage"));
const PostsPage = lazy(() => import("./pages/PostsPage"));
const PostDetailsPage = lazy(() => import("./pages/PostDetailsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));

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

const App = () => {
  const itemsQuantity = useSelector(selectItemsQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await dispatch(requestLogout()).unwrap();
      toast.success(`You've Successfully logged out!`);
    } catch (error) {
      toast.error(`Oops! Something went wrong... ${error}`);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isLoggedIn || !token) return;

    const refresh = async () => {
      try {
        await dispatch(requestRefreshUser()).unwrap();
        toast.success(`You was successfully authorized!`);
      } catch (error) {
        toast.error(`Oops! Something went wrong... ${error}`);
      }
    };

    refresh();
    /*
      1. IIFE?
      
      2. Difference between Function declaration and Function expression

      3. Что такое связность и связанность? Coupling and cohansion
    */
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <title>Gangster Cart</title>
      </Helmet>
      <div className="App">
        <StyledNav>
          {isLoggedIn ? (
            <>
              <StyledNavLink to="/">Home</StyledNavLink>
              <StyledNavLink to="/contacts">Contacts</StyledNavLink>
              <StyledNavLink to="/search">Search Post</StyledNavLink>
              <StyledNavLink to="/posts">All Posts</StyledNavLink>
              <StyledNavLink to="/cart">
                <Badge color="secondary" badgeContent={itemsQuantity}>
                  <ShoppingBasketIcon />
                </Badge>
              </StyledNavLink>
              <div className="user-info">
                <p>UserName: user_name</p>
                <p>UserEmail: user_email@gmail.com</p>
              </div>
              <button className="log-out-btn" onClick={handleLogOut}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <StyledNavLink to="/">Home</StyledNavLink>
              <StyledNavLink to="/register">Register</StyledNavLink>
              <StyledNavLink to="/login">Login</StyledNavLink>
            </>
          )}
        </StyledNav>

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPostsPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:postId/*" element={<PostDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
