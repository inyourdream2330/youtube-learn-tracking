import React from "react";
import LoginForm from "../components/auth/LoginForm.js";
import RegisterForm from "../components/auth/RegisterForm.js";
import { AuthContext } from "../contexts/AuthContext.js";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  let body;
  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else {
    body = (
      <>
        Youre Welcome
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );
  }
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Học Đê</h1>
          <h4>u ta ta ta ta ta ta</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
