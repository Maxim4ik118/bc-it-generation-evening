import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { StyledBadge, StyledProduct } from "./Product.styled";

function Product({ id, title, price, discount = false, onDeleteProduct, onAddToCart }) {
  const hasDiscount = Boolean(discount);
  return (
    <StyledProduct className={`someClass ${hasDiscount ? "sale" : ""}`}>
      <img
        src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640"
        alt={title}
        width="640"
        className="productImg"
      />
      <h2>{title}</h2>
      <p>
        Price: {price}${" "}
        {hasDiscount ? <StyledBadge>SALE: {discount}%</StyledBadge> : null}
      </p>
      <Tooltip title="Add to cart">
        <IconButton
          onClick={() =>
            onAddToCart({
              id,
              title,
              price,
              discount,
            })
          }
        >
          <AddShoppingCartIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={() => onDeleteProduct(id)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </StyledProduct>
  );
}

Product.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
  onDeleteProduct: PropTypes.func,
};

export default Product;
