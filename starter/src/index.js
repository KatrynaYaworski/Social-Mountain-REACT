import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './store/authContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <AuthContextProvider>
    {/* This will allow any component in your app to access the auth context with the useContext hook! */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
)
