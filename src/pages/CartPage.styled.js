import styled from "styled-components";
import { StyledBadge } from "../components/Product/Product.styled";

export const CartItem = styled.div`
  display: flex;
  padding: 20px;
  position: relative;
  background-color: aliceblue;
  /* flex-direction: column; */
  & .item__img {
    max-width: 300px;
  }
  & .item__title {
  }
  & .item__price {
    text-align: left;
  }
  & .item__body {
    padding-left: 15px;
  }
  & .item__counter {
    display: flex;
    align-items: center;
    padding: 10px 0;
  }
`;

export const StyledCartBadge = styled(StyledBadge)`
  position: static;
  padding: 7px 10px;
`;

export const StyledRemoveBtn = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;
