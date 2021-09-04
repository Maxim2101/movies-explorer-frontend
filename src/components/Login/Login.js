import React from "react";
import { useForm } from "react-hook-form";
import AuthPage from "../AuthPage/AuthPage";
import "../AuthPage/Auth.css";

function Login({ sendLogin, inLoginOrRegister }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  function onSubmit(data) {
    sendLogin(data);
  }
  return (
    <AuthPage
      title="Рады видеть!"
      question="Ещё не зарегистрированы?"
      linkFrom="Регистрация"
      path="/signup"
      ifLognin={false}
    >
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
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
            Ошибка сервера, попробуйте войти в аккаунт через какое то время
          </p>
        )}
        <button
          className={`auth__btn ${isValid ? "" : "auth__btn-disable"}`}
          disabled={!isValid}
        >
          Войти
        </button>
      </form>
    </AuthPage>
  );
}

export default Login;
