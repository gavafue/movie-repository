import React from "react";
import ReactDOM from "react-dom/client";
// eslint-disable-next-line
import "mdb-react-ui-kit/dist/css/mdb.min.css";
// eslint-disable-next-line
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
