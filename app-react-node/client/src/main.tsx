import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import ThemeProvider from "./theme/ColorModeContext";
import App from "./App";
import { store } from "./store";
import { setupInterceptors } from "./api/axios";

setupInterceptors(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
