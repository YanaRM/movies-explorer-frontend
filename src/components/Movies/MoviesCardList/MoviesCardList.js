import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import {
  SCREEN_SIZE_768,
  SCREEN_SIZE_1024,
  SCREEN_SIZE_1280,
  START_CARDS_SCREEN_BELOW_768,
  START_CARDS_SCREEN_BELOW_1024,
  START_CARDS_SCREEN_BELOW_1280,
  START_CARDS_SCREEN_ABOVE_1280,
  ADDED_CARDS_SCREEN_BELOW_768,
  ADDED_CARDS_SCREEN_BELOW_1024,
  ADDED_CARDS_SCREEN_BELOW_1280,
  ADDED_CARDS_SCREEN_ABOVE_1280
} from '../../../utils/constants.js';
import './MoviesCardList.css';

function MoviesCardList(props) {
  const [startNumberOfCards, setStartNumberOfCards] = useState(START_CARDS_SCREEN_ABOVE_1280);
  const [addedNumberOfCards, setAddedNumberOfCards] = useState(ADDED_CARDS_SCREEN_ABOVE_1280);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  window.addEventListener("resize", function () {
    setTimeout(() => {
      setScreenWidth(window.innerWidth);
    }, 1000);
  });

  function handleAddButtonClick() {
    setStartNumberOfCards(startNumberOfCards + addedNumberOfCards);
  }

  useEffect(() => {
    screenResize();
  }, [screenWidth]);

  function screenResize() {
    if (screenWidth < SCREEN_SIZE_768) {
      setStartNumberOfCards(START_CARDS_SCREEN_BELOW_768);
      setAddedNumberOfCards(ADDED_CARDS_SCREEN_BELOW_768);
    } else if (screenWidth < SCREEN_SIZE_1024) {
      setStartNumberOfCards(START_CARDS_SCREEN_BELOW_1024);
      setAddedNumberOfCards(ADDED_CARDS_SCREEN_BELOW_1024);
    } else if (screenWidth < SCREEN_SIZE_1280) {
      setStartNumberOfCards(START_CARDS_SCREEN_BELOW_1280);
      setAddedNumberOfCards(ADDED_CARDS_SCREEN_BELOW_1280);
    } else {
      setStartNumberOfCards(START_CARDS_SCREEN_ABOVE_1280);
      setAddedNumberOfCards(ADDED_CARDS_SCREEN_ABOVE_1280);
    }
  }

  return (
    <div className="movies__card-list">
      <div className="movies__card-list-container">
        
        {props.filteredMovies.slice(0, startNumberOfCards).map((data) => (
          <MoviesCard
            movie={data}
            key={data._id || data.id}
            savedMovies={props.savedMovies}
            handleLikeClick={props.handleLikeClick}
            handleDeleteMovie={props.handleDeleteMovie}
          />
        ))}
        
      </div>

      {startNumberOfCards < props.filteredMovies.length ? (
        <button
          className="movies__card-list-button"
          type="button"
          aria-label="Ещё"
          onClick={handleAddButtonClick}>Ещё</button>
      ) : (
        ''
      )}

    </div>
  )
}

export default MoviesCardList;