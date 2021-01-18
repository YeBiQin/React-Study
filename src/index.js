import App from './pages/app'
import React from 'react';
import ReactDOM from 'react-dom';
import { extendTheme, ChakraProvider } from "@chakra-ui/react"

// 可选的自定义主题
const themeParam = extendTheme({
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac"
    }
  }
})

ReactDOM.render(
  <ChakraProvider theme={themeParam}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);