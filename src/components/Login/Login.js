import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
  return (
    <section className="login">
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form">
        <input
          className="login__name-input"
          id="name-input"
          type="text"
          name="name"
          placeholder="Имя"
          minlength="2"
          maxlength="30"
          required
          ></input>
        <input
          className="login__email-input"
          id="email-input"
          type="email"
          name="email"
          placeholder="E-mail"
          required
          ></input>
        <button
          className="login__submit-button"
          type="submit"
          aria-label="Войти">
            Войти
        </button>
      </form>
      <p className="login__caption">Ещё не зарегистрированы? 
        <Link className="login__exit-button" to="">Регистрация</Link>
      </p>
    </section>
  )
}

export default Login;