import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import CryptoContext from "./context/CryptoContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CryptoContext>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </CryptoContext>
  </React.StrictMode>
);
