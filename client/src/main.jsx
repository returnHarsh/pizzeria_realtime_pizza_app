import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from "react-router-dom";
import { UserContextProvider } from './context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ChakraProvider>

      <BrowserRouter>

      <UserContextProvider>
      <App />
      </UserContextProvider>
      
      </BrowserRouter>
    
    </ChakraProvider>
    
  </React.StrictMode>,
)
