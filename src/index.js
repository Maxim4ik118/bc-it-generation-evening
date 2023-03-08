import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { DetailsProvider } from "./context/DetailsContext";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter
    // перед вивантаженням на гітхаб
    // basename="/react-homework-template/"
    >
      <DetailsProvider>
        <App />
      </DetailsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
