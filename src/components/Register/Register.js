import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  return (
    <section className="register">
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form">
        <input
          className="register__name-input"
          id="name-input"
          type="text"
          name="name"
          placeholder="Имя"
          minlength="2"
          maxlength="30"
          required
          ></input>
        <input
          className="register__email-input"
          id="email-input"
          type="email"
          name="email"
          placeholder="E-mail"
          required
          ></input>
        <button
          className="register__submit-button"
          type="submit"
          aria-label="Зарегистрироваться">
            Зарегистрироваться
        </button>
      </form>
      <p className="register__caption">Уже зарегистрированы? 
        <Link className="register__exit-button" to="">Войти</Link>
      </p>
    </section>
  )
}

export default Register;