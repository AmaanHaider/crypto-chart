import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import CryptoContext from "./context/CryptoContext";

const theme = extendTheme({
  config: {
    initialColorMode: "dark", 
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CryptoContext>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </CryptoContext>
  </React.StrictMode>
);
