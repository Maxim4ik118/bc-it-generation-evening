import React from "react";
import ProductList from "./components/ProductList/ProductList";

import "./App.css";
import Details from "./components/Details/Details";

const productsData = [
  {
    id: "3",
    title: "Tacos With Lime M",
    price: 5.85,
    discount: 15,
    activeSale: "18.02.2023",
  },
  {
    id: "1",
    title: "Tacos With Lime XXL",
    price: 10.99,
    discount: 30,
  },
  {
    id: "2",
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
  };

  handleBtnClick = (event) => {
    // 1. this.setState((prevState) => ({ counter: prevState.counter + 1})); - 5% задач
    // 2. this.setState({ counter: this.state.counter + 1}); - 95% задач

    this.setState((prevState) => { // { counter: 0, author: "Maxi", age: 20,}
      return { counter: prevState.counter + 1 };
    });
    this.setState((prevState) => { // { counter: 1, author: "Maxi", age: 20,}
      return { counter: prevState.counter + 1 };
    });
    this.setState((prevState) => { // { counter: 2, author: "Maxi", age: 20,}
      return { counter: prevState.counter + 1 };
    });

    // { ...{counter: 0, author: "Maxi", age: 20}, ...{ counter: 32323, age: 21 } }
    // -> { counter: 32323, author: "Maxi", age: 21, }
  };

  render() {
    return (
      <div className="App">
        <Details
          handleBtnClick={this.handleBtnClick}
          text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus, numquam!"
          counterValue={this.state.counter}
        />

        <h3>Counter inside the App: {this.state.counter}</h3>
        <h3>Age inside the App: {this.state.age}</h3>
        <br />
        <br />
        <ProductList products={productsData} />
      </div>
    );
  }
}

export default App;
