import React from "react";
import "./Logo.css";
import logoPage from "../../images/logo.svg";
import { useHistory } from "react-router-dom";

function Logo() {
  const history = useHistory();
  function pathLogo() {
    history.push("/");
  }
  return (
    <img src={logoPage} alt="Logo" className="logoPage" onClick={pathLogo} />
  );
}

export default Logo;
