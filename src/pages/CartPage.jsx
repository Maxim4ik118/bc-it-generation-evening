import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  decrementQuantity,
  incrementQuantity,
  removeBasketItem,
} from "../redux/basketSlice";
import { selectBasketItems, selectFinalPrice } from "../redux/selectors";

import { CartItem, StyledCartBadge, StyledRemoveBtn } from "./CartPage.styled";

function CartPage() {
  const basketItems = useSelector(selectBasketItems);
  const finalPrice = useSelector(selectFinalPrice);
  const dispatch = useDispatch();

  const incrementItemCount = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const decrementItemCount = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const deleteItem = (productId) => {
    dispatch(removeBasketItem(productId));
  };

  return (
    <Box component="section">
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          {basketItems?.length === 0 && (
            <p>
              Ти ще не додав товари до корзини. Зробити це можна на сторінці{" "}
              <Link to="/">продуктів</Link>
            </p>
          )}
          {basketItems?.length > 0 &&
            basketItems.map((item) => {
              const hasDiscount = Boolean(item.discount);
              return (
                <CartItem key={item.id}>
                  <img
                    className="item__img"
                    src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640"
                    alt={item.title}
                  />
                  <Box className="item__body" component="div">
                    <h3 className="item__title">
                      {item.title}{" "}
                      {hasDiscount && (
                        <StyledCartBadge>
                          SALE: {item.discount}%
                        </StyledCartBadge>
                      )}
                    </h3>
                    <p className="item__price">
                      <b>Price:</b> {item.price}$
                    </p>
                    <Box className="item__counter" component="div">
                      <Tooltip title="Remove one item">
                        <Box component="span">
                          <IconButton
                            onClick={() => decrementItemCount(item.id)}
                            disabled={item.quantity === 1}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </Box>
                      </Tooltip>

                      <Box component="span">{item.quantity}</Box>
                      <Tooltip title="Add one item">
                        <Box component="span">
                          <IconButton
                            onClick={() => incrementItemCount(item.id)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </Tooltip>
                    </Box>
                  </Box>
                  <StyledRemoveBtn>
                    <Tooltip title="Remove item">
                      <IconButton onClick={() => deleteItem(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </StyledRemoveBtn>
                </CartItem>
              );
            })}
        </Grid>
        <Grid item xs={6} md={4}>
          <Box>Final price: {finalPrice}$</Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartPage;
