import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import Root from "./routes/index.jsx";
import { AntLayoutWrapper } from "./ui/commonStyles.js";
import Header from "./components/Header/index.jsx";

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
