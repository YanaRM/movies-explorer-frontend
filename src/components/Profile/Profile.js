import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { FormValidation } from '../../utils/FormValidation.js';
import './Profile.css';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, isValid, setValues } = FormValidation();

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name,
        email: currentUser.email
      });
    }
  }, [currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser(values);
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {props.name}!</h2>
      <form className="profile__form" name="profile" onSubmit={handleSubmit}>
        <div className="profile__input-container">
          <label className="profile__input-caption" htmlFor="name-input">Имя</label>
          <input
            className="profile__name-input"
            id="name-input"
            type="text"
            name="name"
            minLength="2"
            maxLength="30"
            required
            value={values.name || ''}
            onChange={handleChange}>
          </input>
        </div>
        <span className="profile__input-error name-input-error"></span>
        <div className="profile__input-container">
          <label className="profile__input-caption" htmlFor="name-input">E-mail</label>
          <input
            className="profile__email-input"
            id="email-input"
            type="email"
            name="email"
            required
            value={values.email || ''}
            onChange={handleChange}>
          </input>
        </div>
        <span className="profile__input-error email-input-error">{props.updateUserErrorMessage}</span>
        <button
          className={`profile__edit-button ${
            !isValid || (values.name === currentUser.name && values.email === currentUser.email)
            ? 'profile__edit-button_disabled' : ''
          }`}
          type="submit"
          aria-label="Редактировать"
          disabled={!isValid || (values.name === currentUser.name && values.email === currentUser.email)}>Редактировать</button>
      </form>
      <Link className="profile__exit-link" to="/signin" onClick={props.signOut}>Выйти из аккаунта</Link>
    </section>
  )
}

export default Profile;