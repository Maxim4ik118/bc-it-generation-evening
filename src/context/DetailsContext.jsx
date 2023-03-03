import { createContext, useEffect, useState } from "react";

export const DetailsContext = createContext();

export const DetailsProvider = ({ children }) => {
  const [pressedKey, setPressedKey] = useState("");
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) ?? []
  );
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const onAddProduct = (product) => {
    if (products.some((p) => p.title === product.title)) {
      alert(`Oops, product ${product.title} is already in your list`);
      return -1;
    }

    const finalProduct = {
      id: (Math.random() * 100).toString(),
      ...product,
    };

    setProducts([finalProduct, ...products]);
    return 1;
  };

  const onDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <DetailsContext.Provider
      value={{
        pressedKey,
        setPressedKey,
        showDetails,
        setShowDetails,
        onAddProduct,
        onDeleteProduct,
        products,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};
