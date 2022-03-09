import React from "react";
import ReactDOM from "react-dom";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <ContactState>
        <AlertState>
          <App />
        </AlertState>
      </ContactState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById("root")
);
