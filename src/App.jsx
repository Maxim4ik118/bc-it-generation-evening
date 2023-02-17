import "./App.css";
import ProductList from "./components/ProductList/ProductList";

const productsData = [
  {
    id: "3",
    title: "Tacos With Lime M",
    price: 5.85,
    discount: 15,
    activeSale: "18.02.2023"
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

function App() {
  // JSX - розмітка(XML-подібна)
  return (
    <div className="App">
      <ProductList products={productsData} />

      {/* <Product discount={30} title={"Tacos With Lime XXL"} price={10.99} />
      <Product title={"Tacos With Lime XL"} price={6.99} />
      <Product discount={15} title={"Tacos With Lime M"} price={5.85} /> */}
    </div>
  );
}

export default App;
