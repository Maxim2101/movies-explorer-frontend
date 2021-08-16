import React, { useRef } from "react";
import "./SearchForm.css";
import loupeImage from "../../images/loupe.svg";
import loupeAlt from "../../images/loupeAlt.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
function SearchForm() {
  const focusClick = useRef(null);
  const focusInput = () => {
    focusClick.current.focus();
  };

  return (
    <div className="search">
      <div className="search__block">
        <form className="search__form">
          <img
            src={loupeImage}
            alt="Найти"
            className="search__loupe"
            onClick={focusInput}
          />
          <input
            type="text"
            placeholder="Фильм"
            className="search__input"
            ref={focusClick}
            required
          />
          <button className="search__button">
            <img src={loupeAlt} alt="Найти" className="search__img" />
          </button>
        </form>
        <div className="search__help">
          <FilterCheckbox />
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
