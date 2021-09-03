import React from "react";
import "./AuthPage.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

function AuthPage({ children, title, question, linkFrom, path }) {
  return (
    <div className="auth">
      <div className="auth__wrapper">
        <Logo />
        <h2 className="auth__title">{title}</h2>
        {children}
        <div className="auth__more">
          <span className="auth__question">{question}</span>
          <Link className="auth__link" to={path}>
            {linkFrom}
          </Link>
        </div>
      </div>
    </div>
  );
}
export default AuthPage;
