import React from 'react';
import PropTypes from 'prop-types';

import Product from '../Product/Product';

function ProductList({ products }) {
  return (
    <div >
       {products.map((product) => {
          return (
              <Product
                key={product.id}
                discount={product.discount}
                title={product.title}
                price={product.price}
              />
          );
        })}
    </div>
  );
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            discount: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
        }).isRequired
    ).isRequired
}

export default ProductList;
