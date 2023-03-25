import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductForm, ProductList } from "../components";
import { setFilterTerm } from "../redux/productSlice";
import { selectFilterTerm } from "../redux/selectors";

function HomePage() {
  const dispatch = useDispatch();
  const filterTerm = useSelector(selectFilterTerm);

  const handleFilterInput = ({ target: { value } }) => {
    dispatch(setFilterTerm(value));
  };
  return (
    <div>
      <ProductForm />
      <p>Find product by name:</p>
      <input onChange={handleFilterInput} value={filterTerm} type="text" />
      <ProductList />
    </div>
  );
}

export default HomePage;
