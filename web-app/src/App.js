import logo from './logo.svg';
import './App.css';
import * as React from "react"
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}
const theme = extendTheme({ colors })


function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="Header">
        <h1>ITCS</h1>

      </div>
    <div className="App">
      
      
    
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    
    </ChakraProvider>
  );
}

export default App;
