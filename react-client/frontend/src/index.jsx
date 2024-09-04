import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./pages/Login/index.jsx"
import App from "./App.jsx"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* <Login /> */}
    <App />
  </React.StrictMode>
);
