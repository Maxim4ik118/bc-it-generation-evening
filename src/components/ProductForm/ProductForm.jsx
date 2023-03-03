import React, { useContext, useRef, useState } from "react";
// import PropTypes from "prop-types";
import { DetailsContext } from "../../context/DetailsContext";

function ProductForm() {
  const { onAddProduct } = useContext(DetailsContext);
  const titleInputRef = useRef();
  const priceInputRef = useRef();
  const discountInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      title: titleInputRef.current.value,
      price: Number.parseFloat(priceInputRef.current.value),
      discount:
        discountInputRef.current.value.length === 0
          ? false
          : Number.parseInt(discountInputRef.current.value),
    };

    const isSuccess = onAddProduct(product);

    if (isSuccess === 1) {
      reset();
    }
  };

  const reset = () => {
    titleInputRef.current.value = '';
    priceInputRef.current.value = '';
    discountInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Product Form</h2>
      <label>
        <b>Title: </b>
        <input
          ref={titleInputRef}
          name="title"
          type="text"
          placeholder="Назва продукту"
          required
        />
      </label>
      <br />
      <label>
        <b>Price: </b>
        <input
          name="price"
          ref={priceInputRef}
          type="text"
          placeholder="Ціна"
          required
        />
      </label>
      <br />
      <label>
        <b>Discount: </b>
        <input
          name="discount"
          ref={discountInputRef}
          type="text"
          placeholder="Знижка"
        />
      </label>
      <br />
      <button type="submit">Додати продукт</button>
    </form>
  );
}

ProductForm.propTypes = {};

export default ProductForm;
