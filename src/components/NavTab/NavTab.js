import React from "react";
import "./NavTab.css";
import { HashLink } from "react-router-hash-link";

function NavTab() {
  return (
    <nav className="navigation">
      <ul className="navigation__lists">
        <li className="navigation__item">
          <HashLink to="#aboutProject" className="navigation__link">
            О проекте
          </HashLink>
        </li>
        <li className="navigation__item">
          <HashLink to="#aboutTechnology" className="navigation__link">
            Технологии
          </HashLink>
        </li>
        <li className="navigation__item">
          <HashLink to="#aboutStudent" className="navigation__link">
            Студент
          </HashLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
