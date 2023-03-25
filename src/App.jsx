import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { Details, Loader } from "./components";

import { setToggleShowDetails } from "./redux/productSlice";

import { selectItemsQuantity, selectShowDetails } from "./redux/selectors";

import { StyledNavLink } from "./App.styled";
import "./App.css";
import { Badge } from "@mui/material";

const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPostsPage = lazy(() => import("./pages/SearchPostsPage"));
const PostsPage = lazy(() => import("./pages/PostsPage"));
const PostDetailsPage = lazy(() => import("./pages/PostDetailsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));

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
  const showDetails = useSelector(selectShowDetails);
  const dispatch = useDispatch();
  const itemsQuantity = useSelector(selectItemsQuantity);

  const handleToggleDetails = () => {
    dispatch(setToggleShowDetails());
  };

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
        <nav>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/search">Search Post</StyledNavLink>
          <StyledNavLink to="/posts">All Posts</StyledNavLink>
          <StyledNavLink to="/cart">
            <Badge color="secondary" badgeContent={itemsQuantity}>
              <ShoppingBasketIcon />
            </Badge>
          </StyledNavLink>
        </nav>

        <button onClick={handleToggleDetails}>Toggle details</button>
        {showDetails && <Details text="Awee wadaw wd awd awdwwd" />}

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPostsPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:postId/*" element={<PostDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
