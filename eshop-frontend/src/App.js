import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { injectStyle } from "react-toastify/dist/inject-style";
import { Provider } from "react-redux";
import Store from "./services/store";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import routes from "./routes/Routes";
function App() {
  useEffect(() => {
    injectStyle();
  });

  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    element={<route.element />}
                    path={route.path}
                  />
                );
              })}
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
