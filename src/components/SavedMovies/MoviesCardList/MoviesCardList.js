import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import './MoviesCardList.css';

import moviesArray from '../../../utils/moviesArray.js';

function MoviesCardList(props) {
  return (
    <div className="movies__card-list">
      <div className="movies__card-list-container">
        {moviesArray.map((data) => (
          <MoviesCard
            name={data.name}
            image={data.image}
            duration={data.duration}
          />
        ))}
      </div>
    </div>
  )
}

export default MoviesCardList;