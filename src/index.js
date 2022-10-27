import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/config/configStore";
import { Provider } from "react-redux";
import axios from "axios";

// axios.defaults.withCredentials = true;
// refreshToken 쿠키를 주고받을 수 있게 만듬
// >> 위에거를 쓰면 헤더가 안전하지 않다고 못받아옴.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
