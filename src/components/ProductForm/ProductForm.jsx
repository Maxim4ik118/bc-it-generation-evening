import React, { useState } from "react";
import PropTypes from "prop-types";

function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    price: "",
    discount: "",
    title: "",
  });

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      title: formData.title,
      price: Number.parseFloat(formData.price),
      discount:
        formData.discount.length === 0
          ? false
          : Number.parseInt(formData.discount),
    };

    const isSuccess = onAddProduct(product);

    if (isSuccess === 1) {
      reset();
    }
  };

  const reset = () => {
    setFormData({
      title: "",
      price: "",
      discount: "",
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Product Form</h2>
      <label>
        <b>Title: </b>
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
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
          value={formData.price}
          onChange={handleInputChange}
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
          value={formData.discount}
          onChange={handleInputChange}
          type="text"
          placeholder="Знижка"
        />
      </label>
      <br />
      <button type="submit">Додати продукт</button>
    </form>
  );
}

ProductForm.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
};

export default ProductForm;
