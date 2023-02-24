import React from "react";

import ProductList from "./components/ProductList/ProductList";
import Details from "./components/Details/Details";
import ProductForm from "./components/ProductForm/ProductForm";

import "./App.css";

const productsData = [
  {
    id: "3", // "3" !== "2" - true
    title: "Tacos With Lime M",
    price: 5.85,
    discount: 15,
  },
  {
    id: "1", // "1" !== "2" - true
    title: "Tacos With Lime XXL",
    price: 10.99,
    discount: 30,
  },
  {
    id: "2", // "2" !== "2" - false
    title: "Tacos With Lime XL",
    price: 6.99,
    discount: false,
  },
];

/* 

Компонент перемальовується(рендериться) коли:
1. В ньому змінився стейт(setState)
2. В нього прийшли нові пропси

*/
class App extends React.Component {
  state = {
    pressedKey: "",
    // products: JSON.parse(localStorage.getItem('products')) ?? [],
    products: [],
    showDetails: false,
  };

  componentDidMount() {
    const parsedProducts = JSON.parse(localStorage.getItem("products"));
    if (parsedProducts !== null) {
      this.setState({ products: parsedProducts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.products.length !== this.state.products.length) {
      localStorage.setItem("products", JSON.stringify(this.state.products));
    }

    if (prevState.showDetails !== this.state.showDetails) {
      console.log(
        "Show details was changed and now is equal to :",
        this.state.showDetails
      );
    }

    if (prevState.pressedKey !== this.state.pressedKey) {
      console.log(
        "Pressed Key was changed and now is equal to :",
        this.state.pressedKey
      );
    }
  }

  handlePressKey = (key) => {
    this.setState({ pressedKey: key });
  };

  onAddProduct = (product) => {
    if (this.state.products.some((p) => p.title === product.title)) {
      alert(`Oops, product ${product.title} is already in your list`);
      return -1;
    }

    const finalProduct = {
      id: (Math.random() * 100).toString(),
      ...product,
    };

    this.setState({
      products: [finalProduct, ...this.state.products],
    });

    return 1;
  };

  onDeleteProduct = (productId) => {
    // "2"
    this.setState({
      products: this.state.products.filter(
        (product) => product.id !== productId
      ),
    });
  };

  handleToggleDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.handleToggleDetails}>Toggle details</button>
        {this.state.showDetails && (
          <Details
            text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, numquam!"
            pressedKey={this.state.pressedKey}
            handlePressKey={this.handlePressKey}
          />
        )}

        <ProductForm onAddProduct={this.onAddProduct} />
        <br />
        <ProductList
          onDeleteProduct={this.onDeleteProduct}
          products={this.state.products}
        />
      </div>
    );
  }
}

export default App;
