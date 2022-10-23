import React from "react";
import "./Style/style.css";

import { Provider } from "react-redux";
import store from "./store";
import Router from "./router/Router";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Router />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
