import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/productSlice";

// import PropTypes from 'prop-types';

import Product from "../Product/Product";

function ProductList() {
  // const { products, onDeleteProduct } = useContext(DetailsContext);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const onDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div>
      {products?.length > 0 &&
        products.map((product) => {
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

ProductList.propTypes = {
  // products: PropTypes.arrayOf(
  //     PropTypes.shape({
  //         id: PropTypes.string.isRequired,
  //         title: PropTypes.string.isRequired,
  //         price: PropTypes.number.isRequired,
  //         discount: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
  //     }).isRequired
  // ).isRequired,
  // onDeleteProduct: PropTypes.func
};

export default ProductList;
