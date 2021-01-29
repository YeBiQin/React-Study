import App from './pages/app'
import React from 'react';
import ReactDOM from 'react-dom';
import { extendTheme, ChakraProvider } from "@chakra-ui/react"
// import '../public/style/global.css';

// 可选的自定义主题
const themeParam = extendTheme({
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac"
    }
  }
});

// const FancyButton = React.forwardRef((props, ref) => (
//   <button ref={ref} className="FancyButton">
//     {console.log(ref)}
//     {console.log(props.children)}
//     {props.children}
//   </button>
// ));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
console.log(ref);

ReactDOM.render(
  <ChakraProvider theme={themeParam}>
    <React.StrictMode>
      {/* <FancyButton ref={ref}>Click me!</FancyButton> */}
      <App />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);