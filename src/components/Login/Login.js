import React from 'react';
import { Link } from 'react-router-dom';
import logoPicture from '../../images/logo-picture.svg';
import './Login.css';

function Login(props) {
  return (
    <section className="login">
      <Link className="login__logo-link" to="/">
        <img className="register__logo-picture" src={logoPicture} alt="Логотип" />
      </Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form">
        <div className="login__input-container">
          <label className="login__input-caption">E-mail</label>
          <input
          className="login__email-input"
          id="email-input"
          type="email"
          name="email"
          required>
          </input>
          <span className="login__input-error email-input-error"></span>
        </div>
        <div className="login__input-container">
          <label className="login__input-caption">Пароль</label>
          <input
            className="login__password-input"
            id="password-input"
            type="password"
            name="password"
            minLength="8"
            required>
          </input>
          <span className="login__input-error password-input-error"></span>
        </div>
        <button
          className="login__submit-button"
          type="submit"
          aria-label="Войти">
            Войти
        </button>
      </form>
      <p className="login__caption">Ещё не зарегистрированы? 
        <Link className="login__register-link" to="/signup">Регистрация</Link>
      </p>
    </section>
  )
}

export default Login;