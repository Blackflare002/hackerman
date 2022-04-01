import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AppContextProvider } from "./components/AppContext";
import "./fonts/index.css";

ReactDOM.render(
  // <React.StrictMode>
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  // </React.StrictMode>, // strict mode causes increments/decrements in reducers to run twice
  document.getElementById("root")
);
