import React from "react";
import { NavLink } from "react-router-dom";

function HeaderElements({ ifLoginIn }) {
  return (
    <div
      className={`header__elements ${
        ifLoginIn ? "header__elements_disable" : ""
      }`}
    >
      <NavLink
        className="header__link"
        activeClassName="header__link_active"
        to="/movies"
      >
        Фильмы
      </NavLink>
      <NavLink
        className="header__link"
        activeClassName="header__link_active"
        to="/saved-movies"
      >
        Сохраненные фильмы
      </NavLink>
    </div>
  );
}
export default HeaderElements;
