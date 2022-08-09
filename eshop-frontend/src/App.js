import logo from "./logo.svg";
import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { injectStyle } from "react-toastify/dist/inject-style";
import { Provider } from "react-redux";
import Store from "./services/store";
import { useEffect } from "react";

import MainPage from "./routes/MainPage";
import ProductPreview from "./routes/ProductPreview";

function App() {
  useEffect(() => {
    injectStyle();
  });
  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/preview" element={<ProductPreview />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
