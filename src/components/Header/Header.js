import React, { useState } from "react";

import "./Header.css";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router-dom";
import HeaderAuthorized from "../HeaderAuthorized/HeaderAuthorized";
import HeaderElements from "../HeaderElements/HeaderElements";

function Header({ ifLoginIn }) {
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  function openBurger() {
    setBurgerOpen(!isBurgerOpen);
  }
  return (
    <header className="header">
      <div className="header__wrapper">
        <Logo />
        <HeaderElements ifLoginIn={ifLoginIn} />
        {ifLoginIn ? (
          <HeaderAuthorized
            isBurgerOpen={isBurgerOpen}
            openBurger={openBurger}
          />
        ) : (
          <div className="header__auth">
            <Link to="/signup">
              <button className="header__signup">Регистрация</button>
            </Link>
            <Link to="/signin">
              <button className="header__signin">Войти</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
