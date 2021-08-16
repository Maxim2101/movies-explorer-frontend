import React from "react";
import "./AuthPage.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

function AuthPage({
  children,
  title,
  buttonText,
  question,
  linkFrom,
  path,
  ifLognin,
}) {
  return (
    <div className="auth">
      <div className="auth__wrapper">
        <Logo />
        <h2 className="auth__title">{title}</h2>
        <form className="auth__form">
          {children}
          {ifLognin && (
            <span className="auth__error">Что-то пошло не так...</span>
          )}
          <button className="auth__btn">{buttonText}</button>
          <div className="auth__more">
            <span className="auth__question">{question}</span>
            <Link className="auth__link" to={path}>
              {linkFrom}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AuthPage;
