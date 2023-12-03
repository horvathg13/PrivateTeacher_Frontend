import './App.css';
import * as React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./Register/register"
import Header from './Header/header';
import Login from './Login/login';
import Home from './Home/home';
import Users from './Users/user';
import Protected from './ProtectedRoutes';
import { UserContextProvider } from './Context/UserContext';
import SelectedUserComponent from './Users/selectedUser';

function App() {
  return (
    <>
    <UserContextProvider>
      <Router>
        <Header />

        <Routes>
          
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route element={<Protected/>}>
            <Route path="/home" element={<Home />}/>
            <Route path="/users" element={<Users />}>
              <Route path=":userId" element={<SelectedUserComponent />}/>
            </Route>
            
          </Route>
          
        </Routes>

      </Router>
    </UserContextProvider>
    </>
  );
}

export default App;
