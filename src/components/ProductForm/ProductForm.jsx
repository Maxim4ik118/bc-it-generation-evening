import React, { useRef } from "react";
import { useDispatch } from "react-redux";
// import PropTypes from "prop-types";
import { addProduct } from "../../redux/store";

function ProductForm() {
  // const { onAddProduct } = useContext(DetailsContext);
  const dispatch = useDispatch();
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

    // dispatch(addProduct(product));
    dispatch(addProduct(product));

    reset();
  };

  const reset = () => {
    titleInputRef.current.value = "";
    priceInputRef.current.value = "";
    discountInputRef.current.value = "";
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
