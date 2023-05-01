import React from 'react';
import { useLocation } from 'react-router-dom';


function MoviesCard(props) {
const location = useLocation();

  return (
    <>
        <div className="movie__container">
          <a target="_blank" href='/' rel="noreferrer">
            <img className="movie__image" alt='пропс.альт' src='http://pm1.narvii.com/8168/8e0362867a9ccdcefbfb7ae66c6b5e44db44019fr1-1920-1080v2_uhq.jpg' />
          </a>
          <div className="movie__info">
            <div className="movie__title">33 слова о дизайне</div>
            <button className={`movie__icon 
            ${
              location.pathname === '/movies'
              ?  `movie__like ${props.isLiked && 'movie__like_active'}`
              : 'movie__remove'
            }`} 
            type="button" />
          </div>
          <div className="movie__duration">1ч42</div>
        </div>
    </>
  )
} 


export default MoviesCard;