import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import './Profile.css';

function Profile(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name, email
    })
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
            value={name || ''}
            onChange={handleChangeName}>
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
            value={email || ''}
            onChange={handleChangeEmail}>
          </input>
        </div>
        <span className="profile__input-error email-input-error"></span>
        <button className="profile__edit-button" type="submit" aria-label="Редактировать">Редактировать</button>
      </form>
      <Link className="profile__exit-link" to="/signin" onClick={props.signOut}>Выйти из аккаунта</Link>
    </section>
  )
}

export default Profile;