import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { store } from "./redux/store";
import { DetailsProvider } from "./context/DetailsContext";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DetailsProvider>
          <App />
        </DetailsProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
