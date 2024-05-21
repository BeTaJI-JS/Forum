import React from "react";

import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import Header from "components/Header";

import { AntLayoutWrapper } from "ui/commonStyles.js";

import Root from "./routes";
import store, { persistor } from "./store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <AntLayoutWrapper>
              <Header />
              <Root />
            </AntLayoutWrapper>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </CookiesProvider>,
);
