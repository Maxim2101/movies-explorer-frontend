import React from "react";
import { useForm } from "react-hook-form";
import AuthPage from "../AuthPage/AuthPage";
import "../AuthPage/Auth.css";

function Register({ sendRegister, inLoginOrRegister }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  function onSubmit(data) {
    sendRegister(data);
  }
  return (
    <AuthPage
      title="Добро пожаловать!"
      question="Уже зарегистрированы?"
      linkFrom="Войти"
      path="/signin"
      ifLognin={true}
    >
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Name" className="auth__about">
          Name
        </label>
        <input
          type="text"
          className="auth__input"
          placeholder="Ваше имя"
          id="Name"
          {...register("name", {
            required: "Это обязательное поле",
            pattern: {
              value: /(?=^.{4,}$)^[а-яА-ЯёЁa-zA-Z0-9]+$/i,
              message: "Минимум 4 буквы",
            },
          })}
        />
        <p className="auth__error">{errors.name && errors.name.message}</p>
        <label htmlFor="Email" className="auth__about">
          E-mail
        </label>
        <input
          type="email"
          className="auth__input"
          placeholder="Ваш email"
          id="Email"
          {...register("email", {
            required: "Это обязательное поле",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Пожалуйста введите email",
            },
          })}
        />
        <p className="auth__error">{errors.email && errors.email.message}</p>
        <label htmlFor="Password" className="auth__about">
          Password
        </label>
        <input
          type="password"
          className="auth__input"
          placeholder="Ваш password"
          id="Password"
          {...register("password", {
            required: "Это обязательное поле",
            pattern: {
              value:
                /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i,
              message:
                "Пароль должен содержать не менее 8 букв, из которых 1 заглавная , 1 строчная и 1 спецмимвол",
            },
          })}
        />
        <p className="auth__error">
          {errors.password && errors.password.message}
        </p>
        {inLoginOrRegister && (
          <p className="auth__error">
            Ошибка сервера, попробуйте зарегистрироваться какое то время
          </p>
        )}
        <button
          className={`auth__btn ${isValid ? "" : "auth__btn-disable"}`}
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      </form>
    </AuthPage>
  );
}

export default Register;
