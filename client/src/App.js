import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContext from "./context/auth/authContext";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./App.css";
import Navbar from "./components/layout/Navbar";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  console.log("isAuthenticated", isAuthenticated);
  console.log("loading", loading);
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Alert />
          <Routes>
            <Route
              path="/"
              element={!isAuthenticated && !loading ? <Login /> : <Home />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
