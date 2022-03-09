import React, { useContext } from "react";
import { Route } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import Login from "../auth/Login";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  console.log("isAuthenticated", isAuthenticated);
  console.log("loading", loading);
  return (
    <Route
      {...rest}
      element={(props) =>
        !isAuthenticated && !loading ? <Login /> : <Element {...props} />
      }
    />
  );
};

export default PrivateRoute;
