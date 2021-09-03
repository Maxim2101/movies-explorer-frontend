import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ register }) {
  return (
    <div className="filter">
      <input
        type="checkbox"
        className="filter__input"
        id="filter"
        {...register("checkbox")}
      />
      <label className="filter__title" htmlFor="filter">
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
