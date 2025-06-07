import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import ToastProvider from "./components/ToastProvider";
import App from "./App";
import { store, persistor } from "./store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <App />
          <ToastProvider />
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
