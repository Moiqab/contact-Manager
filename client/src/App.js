import React ,{Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router';

if(localStorage.token) {
  setAuthToken(localStorage.token);
};

const App = () => {

  return (
    <AuthState>
    <ContactState>
      <AlertState>
    <Router>
      <Fragment>
      <Navbar/>
      <div className="container">
        <Alert/>
        <Routes>
        <PrivateRoute exact path='/' element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          </Routes>


      </div>
      </Fragment>
      </Router>
      </AlertState>
      </ContactState>
      </AuthState>

  );
}

export default App;
