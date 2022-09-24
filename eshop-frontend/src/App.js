import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import { injectStyle } from "react-toastify/dist/inject-style";
import { Provider } from "react-redux";
import Store from "./services/store";
import { useEffect } from "react";
import ScrollToTop from "./hooks/ScrollToTop";
import routes from "./routes/Routes";
import PageNotFound from "./routes/ErrorPage/PageNotFound";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  useEffect(() => {
    injectStyle();
  });
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
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
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </ScrollToTop>
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
