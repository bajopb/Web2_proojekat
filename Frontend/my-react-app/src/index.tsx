import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/contextProvider';
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="929605301802-tv29bd2agkr23rb0p1b45abfhoiqjemh.apps.googleusercontent.com">

      <AuthContextProvider>
        <App />
        </AuthContextProvider>
        </GoogleOAuthProvider>
        </BrowserRouter>
  </React.StrictMode>
);


