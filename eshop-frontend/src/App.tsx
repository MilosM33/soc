import React, { useEffect } from "react";
import "./Style/output.css";

import { Provider } from "react-redux";
import store from "./store";
import Router from "./router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ScrollToTop from "./Hooks/ScrollToTop";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer autoClose={2000} />

        <Provider store={store}>
          <Router></Router>
        </Provider>

        <div id="portal"></div>
      </QueryClientProvider>
    </>
  );
}

export default App;
