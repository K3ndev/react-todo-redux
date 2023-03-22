import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { todoStore } from "./shared/store/todoStore";
import "./shared/style/main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* wrapping the app component to access the todoStore  */}
    <Provider store={todoStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
