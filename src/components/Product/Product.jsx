import PropTypes from "prop-types";

import { StyledBadge, StyledProduct } from "./Product.styled";

function Product({ title, price, discount = false }) {

  const hasDiscount = discount !== false;
  return (
    <StyledProduct
        className={hasDiscount ? "sale" : ""}
    >
      <img
        src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640"
        alt={title}
        width="640"
        className="productImg"
      />
      <h2>{title}</h2>
      <p>
        Price: {price}${" "}
        {hasDiscount ? (
          <StyledBadge>
            SALE: {discount}%
          </StyledBadge>
        ) : null}
      </p>
      <button type="button">Add to cart</button>
    </StyledProduct>
  );
}

Product.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
};

export default Product;
