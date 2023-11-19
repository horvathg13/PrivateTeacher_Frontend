import './App.css';
import * as React from "react";
import {createBrowserRouter, RouterProvider, BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Register from "./Register/register"
import Header from './Header/header';


function App() {
  return (
    <>
    <Router>
        <Header />
        <Routes>
          
          <Route path="/register" element={<Register />}/>
        </Routes>

      </Router>
    </>
  );
}

export default App;
