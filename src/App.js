import './App.css';
import * as React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./Register/register"
import Header from './Header/header';
import Login from './Login/login';
import Home from './Home/home';

function App() {
  return (
    <>
    <Router>
        <Header />
        <Routes>
          
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/home" element={<Home />}/>
        </Routes>

      </Router>
    </>
  );
}

export default App;
