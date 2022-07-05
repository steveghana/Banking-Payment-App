import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
// import "./styles/Index.scss";
import App from "./App";
import { ContextProvider } from "./context/context";

import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const history = createBrowserHistory();
root.render(
  <React.StrictMode>
    {/* <ContextProvider> */}
    <App />
    {/* </ContextProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
