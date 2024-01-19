import React from 'react';
import { Link } from 'react-router-dom';
import logoPicture from '../../images/logo-picture.svg';
import './Register.css';

function Register(props) {
  return (
    <section className="register">
      <Link className="register__logo-link" to="/">
        <img className="register__logo-picture" src={logoPicture} alt="Логотип" />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form">
        <div className="register__input-container">
          <label className="register__input-caption">Имя</label>
          <input
            className="register__name-input"
            id="name-input"
            type="text"
            name="name"
            minlength="2"
            maxlength="30"
            required>
          </input>
        </div>
        <span className="register__input-error name-input-error"></span>
        <div className="register__input-container">
          <label className="register__input-caption">E-mail</label>
          <input
            className="register__email-input"
            id="email-input"
            type="email"
            name="email"
            required>
          </input>
        </div>
        <span className="register__input-error email-input-error"></span>
        <div className="register__input-container">
          <label className="register__input-caption">Пароль</label>
          <input
            className="register__password-input"
            id="password-input"
            type="password"
            name="password"
            minLength="8"
            required>
          </input>
        </div>
        <span className="register__input-error password-input-error"></span>
        <button
          className="register__submit-button"
          type="submit"
          aria-label="Зарегистрироваться">
            Зарегистрироваться
        </button>
      </form>
      <p className="register__caption">Уже зарегистрированы? 
        <Link className="register__exit-button" to="/">Войти</Link>
      </p>
    </section>
  )
}

export default Register;