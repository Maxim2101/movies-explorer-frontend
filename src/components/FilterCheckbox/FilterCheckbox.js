import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <div className="filter">
      <input type="checkbox" className="filter__input" id="filter" />
      <label className="filter__title" htmlFor="filter">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
