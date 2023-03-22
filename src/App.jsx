import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Details, Loader, ProductForm, ProductList } from "./components";

// import HomePage from "./pages/HomePage";
// import SearchPostsPage from "./pages/SearchPostsPage";
// import PostsPage from "./pages/PostsPage";
// import PostDetailsPage from "./pages/PostDetailsPage";
import { setFilterTerm, setToggleShowDetails } from "./redux/productSlice";

import { StyledNavLink } from "./App.styled";
import "./App.css";
import { selectFilterTerm, selectShowDetails } from "./redux/selectors";

const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPostsPage = lazy(() => import("./pages/SearchPostsPage"));
const PostsPage = lazy(() => import("./pages/PostsPage"));
const PostDetailsPage = lazy(() => import("./pages/PostDetailsPage"));

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

/*
у мене питання трішки не по темі: 
як налаштувати автоімпорт у файлах .tx  та .tsx? 
 Бо тепер він працює якось дуже вибірково


*/

const App = () => {
  const showDetails = useSelector(selectShowDetails);
  const filterTerm = useSelector(selectFilterTerm);
  const dispatch = useDispatch();

  const handleToggleDetails = () => {
    dispatch(setToggleShowDetails());
  };

  const handleFilterInput = ({ target: { value } }) => {
    dispatch(setFilterTerm(value));
  }

  return (
    <div className="App">
      <nav>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/search">Search Post</StyledNavLink>
        <StyledNavLink to="/posts">All Posts</StyledNavLink>
      </nav>

      <button onClick={handleToggleDetails}>Toggle details</button>
      {showDetails && <Details text="Awee wadaw wd awd awdwwd" />}
      <ProductForm />
      <p>Find product by name:</p>
      <input onChange={handleFilterInput} value={filterTerm} type="text"  />
      <ProductList />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPostsPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:postId/*" element={<PostDetailsPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
