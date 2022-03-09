import React, { useContext } from 'react';
import {Route } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import Login from '../auth/Login';

 const PrivateRoute = ({component : Component , ...rest}) => {

    const authContext =useContext(AuthContext);
    const {isAuthenticated , loading} = authContext;
  return (
    <Route {...rest} render ={props=>!isAuthenticated && !loading ? (
        <Login />
    )
    :
    (
        <Component {...props} />
    )
}   />
  )
}

export default PrivateRoute;
