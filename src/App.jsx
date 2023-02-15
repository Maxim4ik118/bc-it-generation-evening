import PropTypes from 'prop-types';

import "./App.css";

const productsData = [ {
    id: "3",
    title: "Tacos With Lime M",
    price: 5.85,
    discount: 15,
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
        {productsData.map((product) => {
          return (
              <Product
                key={product.id}
                discount={product.discount}
                title={product.title}
                price={product.price}
              />
          );
        })}

      {/* <Product discount={30} title={"Tacos With Lime XXL"} price={10.99} />
      <Product title={"Tacos With Lime XL"} price={6.99} />
      <Product discount={15} title={"Tacos With Lime M"} price={5.85} /> */}
    </div>
  );
}

function Product({ title, price, discount = false }) {
  return (
    <div>
      <img
        src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640"
        alt={title}
        width="640"
      />
      <h2>{title}</h2>
      <p>
        Price: {price}$ {discount !== false ? <b>SALE: {discount}%</b> : null}
      </p>
      <button type="button">Add to cart</button>
    </div>
  );
};

Product.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number,
}

export default App;
