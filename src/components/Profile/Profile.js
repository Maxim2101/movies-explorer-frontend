import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { useForm } from "react-hook-form";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile({
  loggedIn,
  sendEditProfile,
  endSession,
  inProfileTrue,
  inProfileError,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
  });
  function onSubmit(data) {
    sendEditProfile(data);
  }
  return (
    <>
      <Header loggedIn={loggedIn} />
      <div className="profile">
        <h2 className="profile__name">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile__more">
            <label className="profile__about">Имя</label>
            <input
              className="profile__info"
              {...register("name", {
                required: "Это обязательное поле",
                pattern: {
                  value: /(?=^.{4,}$)^[а-яА-ЯёЁa-zA-Z0-9]+$/i,
                  message: "Минимум 4 буквы",
                },
              })}
            />
          </div>
          <p className="profile__error">{errors.name && errors.name.message}</p>
          <div className="profile__more">
            <label className="profile__about">E-mail</label>
            <input
              className="profile__info"
              {...register("email", {
                required: "Это обязательное поле",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Пожалуйста введите email",
                },
              })}
            />
          </div>
          <p className="profile__error">
            {errors.email && errors.email.message}
          </p>
          {inProfileTrue && (
            <p className="profile__error-false">Ваши данные сохранены</p>
          )}
          {inProfileError && (
            <p className="profile__error">Ваши данные не сохранены</p>
          )}
          <button className="profile__edit" disabled={!isDirty && isValid}>
            Редактировать
          </button>
        </form>
        <button className="profile__exit" onClick={endSession}>
          Выйти из аккаунта
        </button>
      </div>
    </>
  );
}

export default Profile;
