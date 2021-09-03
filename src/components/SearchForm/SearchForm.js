import React, { useRef } from "react";
import "./SearchForm.css";
import loupeImage from "../../images/loupe.svg";
import loupeAlt from "../../images/loupeAlt.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useForm } from "react-hook-form";

function SearchForm({ makeSearch }) {
  const focusClick = useRef(null);
  const focusInput = () => {
    focusClick.current.focus();
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  function onSubmit(data) {
    makeSearch(data);
  }
  return (
    <div className="search">
      <div className="search__block">
        <form className="search__form" onSubmit={handleSubmit(onSubmit)}>
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
            {...register("input", {
              required: "Это обязательное поле",
            })}
          />
          <button className="search__button">
            <img src={loupeAlt} alt="Найти" className="search__img" />
          </button>
        </form>
        <div className="search__help">
          <FilterCheckbox register={register} />
        </div>
        <p className="search__error">{errors.input && errors.input.message}</p>
      </div>
    </div>
  );
}

export default SearchForm;
