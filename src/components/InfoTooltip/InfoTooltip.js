import React from 'react';
import './InfoTooltip.css';
import SuccessPicture from '../../images/success-sign.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup__info-tooltip ${props.isOpen && 'popup__info-tooltip_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button"
          aria-label="Закрыть диалоговое окно" onClick={props.onClose} />
        <img className="popup__message-image" src={SuccessPicture} alt="Профиль успешно обновлён" />
        <p className="popup__message">Профиль успешно обновлён</p>
      </div>
    </div>
  )
}

export default InfoTooltip;