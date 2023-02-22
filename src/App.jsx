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
    id: "1",// "1" !== "2" - true
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
    counter: 0,
    author: "Maxi",
    age: 20,
    products: productsData,
  };

  handleBtnClick = (event) => {
    this.setState((prevState) => {
      // { counter: 0, author: "Maxi", age: 20,}
      return { counter: prevState.counter + 1 };
    });
  };

  onAddProduct = (product) => {
    if(this.state.products.some(p => p.title === product.title)) {
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
    // this.setState((prevState) => {
    //   return { products: [finalProduct, ...prevState.products] };
    // });
  };

  onDeleteProduct = (productId) => { // "2"
    this.setState({
      products: this.state.products.filter(product => product.id !== productId)
    })
  }

  render() {
    return (
      <div className="App">
        <ProductForm onAddProduct={this.onAddProduct} />
        <Details
          handleBtnClick={this.handleBtnClick}
          text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, numquam!"
          counterValue={this.state.counter}
        />

        <br />
        <ProductList onDeleteProduct={this.onDeleteProduct} products={this.state.products} />
      </div>
    );
  }
}

export default App;
