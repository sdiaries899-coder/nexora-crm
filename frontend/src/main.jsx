import React from "react";//import core react library
import ReactDOM from "react-dom/client";//react dom is library that can transform react virtual compoenent into actual component on webbrouser
import { BrowserRouter } from "react-router-dom";// this is used to allow app to change from url and change\swap compoenent without refresh of pages
import App from "./App";//actual layout and feature are in this file
import "./styles/index.css";//gloabal style setup for app 
import { AuthProvider } from "./context/AuthContext";//golabl manager for user login and share data to any compoenent in app automatically
ReactDOM.createRoot(document.getElementById("root")).render(
  //above line is core mouting line that looks at the raw index.html file , find empty div with id root and make it as base container 
  //and .rendor() will start creating application inside this 
  // below line activated react strict mode to indentify bugs and warm about common life cycle
  //everything inside the brouser routes now able to use useNanigate define url path like /login and /dashboard
  //authprovide is used to share the data to each component of the application
  //app is actual layout 
  //Strict Mode (Checks for bugs) → Browser Router (Handles URLs) → Auth Provider (Tracks user login) → App (Your actual website layout)
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);