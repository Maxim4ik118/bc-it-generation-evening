import React, { useContext } from 'react';
import { DetailsContext } from '../../context/DetailsContext';
// import PropTypes from 'prop-types';

import Product from '../Product/Product';

function ProductList() {
  const { products, onDeleteProduct } = useContext(DetailsContext);

  return (
    <div >
       {products?.length > 0 && products.map((product) => {
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
}

export default ProductList;
