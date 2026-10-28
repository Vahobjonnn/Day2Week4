import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import ProductsById from "./pages/ProductsById";
import About from "./pages/About";
import AuthFlow from "./pages/AuthFlow";
import Login from "./pages/Login";
import Catalog from "./pages/Catalog";
import Products from "./pages/Products";

const router = createBrowserRouter([
  
  {
    path:"/login",
    element:<Login/>
  },
  {
    path: "/",
    element:<AuthFlow><Layout/></AuthFlow>,
    children:[
      {
        index:true,
        element:<AuthFlow><Home/></AuthFlow>
      },
      {
        path:"users/:id",
        element:<AuthFlow><ProductsById/></AuthFlow>
      },
      {
        path:"catalog",
        element:<AuthFlow><Catalog/></AuthFlow>
      },
      {
        path:"products",
        element:<AuthFlow><Products/></AuthFlow>
      },
    ]
    
  },
]);

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
};

export default App;
