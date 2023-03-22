import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteProduct } from "../../redux/productSlice";
import { selectFilteredProducts } from "../../redux/selectors";

// import PropTypes from 'prop-types';

import Product from "../Product/Product";

function ProductList() {
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);

  const onDeleteProduct = (productId) => dispatch(deleteProduct(productId));

  // const filteredProducts = useMemo(() => {
  //   return products.filter(
  //     (
  //       product // derived data
  //     ) => product.title.toLowerCase().includes(filterTerm.trim().toLowerCase())
  //   );
  // }, [products, filterTerm]);

  return (
    <div>
      {filteredProducts?.length > 0 &&
        filteredProducts.map((product) => {
          return (
            <Product
              key={product.id}
              id={product.id}
              discount={product.discount}
              title={product.title}
              price={product.price}
              onDeleteProduct={onDeleteProduct}
            />
          );
        })}
    </div>
  );
}

export default ProductList;
