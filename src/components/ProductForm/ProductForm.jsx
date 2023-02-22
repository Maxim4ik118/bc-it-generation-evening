import React, { Component } from "react";

class ProductForm extends Component {
  state = {
    title: "",
    price: "",
    discount: "",
  };

  handleInputChange = ({ target: { name, value } }) => {
    // const { name, value } = event.target;

    this.setState({
      [name]: value,
    });

    // this.state.title
    // this.state["title"]
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      title: this.state.title,
      price: Number.parseFloat(this.state.price),
      discount:
        this.state.discount.length === 0
          ? false
          : Number.parseInt(this.state.discount),
    };

    const isSuccess = this.props.onAddProduct(product);

    if (isSuccess === 1) {
      this.reset();
    }
  };

  reset() {
    this.setState({
      title: "",
      price: "",
      discount: "",
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Product Form</h2>
        <label>
          <b>Title: </b>
          <input
            name="title"
            value={this.state.title}
            onChange={this.handleInputChange}
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
            value={this.state.price}
            onChange={this.handleInputChange}
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
            value={this.state.discount}
            onChange={this.handleInputChange}
            type="text"
            placeholder="Знижка"
          />
        </label>
        <br />
        <button type="submit">Додати продукт</button>
      </form>
    );
  }
}

export default ProductForm;
