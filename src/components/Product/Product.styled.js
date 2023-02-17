import styled from "styled-components";

export const StyledProduct = styled.div`
  max-width: 350px;
  border: 2px solid blue;
  text-align: center;
  padding: 15px 10px;
  margin-bottom: 20px;
  position: relative;

  &.sale {
    background-color: beige;
  }

  & .productImg {
    width: 100%;
  }
`;

export const StyledBadge = styled.b`
  position: absolute;
  top: 20px;
  right: 15px;
  background-color: black;
  border-radius: 5px;
  padding: 10px;
  color: #fff;
`;
