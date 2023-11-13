import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@ui/toaster"
import { StoreProvider } from "./Store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <App />
        <Toaster />
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
