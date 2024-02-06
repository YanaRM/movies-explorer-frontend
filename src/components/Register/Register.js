import React from 'react';
import { Link } from 'react-router-dom';
import logoPicture from '../../images/logo-picture.svg';
import { FormValidation } from '../../utils/FormValidation.js';
import { EMAIL_REGULAR_EXPRESSION } from '../../utils/constants.js';
import './Register.css';

function Register(props) {
  const { values, errors, isValid, handleChange } = FormValidation();

  function disableSubmitButton() {
    document.querySelector('.register__submit-button').disabled = true;
  }

  let isNotClearInput = false;

  function handleSubmit(e) {
    e.preventDefault();

    isNotClearInput = document.querySelector('.register__form').checkValidity();

    if (isNotClearInput === true) {
      disableSubmitButton();

      const { name, email, password } = values;
      props.handleRegister({ name, email, password });

      isNotClearInput = false;
    }

    document.querySelector('.register__submit-button').disabled = false;
  }

  return (
    <section className="register">
      <Link className="register__logo-link" to="/">
        <img className="register__logo-picture" src={logoPicture} alt="Логотип" />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" name="register" onSubmit={handleSubmit}>
        <div className="register__input-container">
          <label className="register__input-caption">Имя</label>
          <input
            className="register__name-input"
            id="name-input"
            type="text"
            name="name"
            minLength="2"
            maxLength="30"
            value={values.name || ''}
            onChange={handleChange}
            required
            disabled={props.isInputDisabled}>
          </input>
        </div>
        <span className="register__input-error name-input-error">{errors.name}</span>
        <div className="register__input-container">
          <label className="register__input-caption">E-mail</label>
          <input
            className="register__email-input"
            id="email-input"
            type="email"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
            pattern={EMAIL_REGULAR_EXPRESSION}
            required
            disabled={props.isInputDisabled}>
          </input>
        </div>
        <span className="register__input-error email-input-error">{errors.email}</span>
        <div className="register__input-container">
          <label className="register__input-caption">Пароль</label>
          <input
            className="register__password-input"
            id="password-input"
            type="password"
            name="password"
            minLength="8"
            value={values.password || ''}
            onChange={handleChange}
            required
            disabled={props.isInputDisabled}>
          </input>
        </div>
        <span className="register__input-error password-input-error">{props.registerErrorMessage || errors.password}</span>
        <button
          className={`register__submit-button ${isValid ? '' : 'register__submit-button_disabled'}`}
          type="submit"
          aria-label="Зарегистрироваться"
          disabled={!isValid}>
            Зарегистрироваться
        </button>
      </form>
      <p className="register__caption">Уже зарегистрированы? 
        <Link className="register__auth-link" to="/signin">Войти</Link>
      </p>
    </section>
  )
}

export default Register;