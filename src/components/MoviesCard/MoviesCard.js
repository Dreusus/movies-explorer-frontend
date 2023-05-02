import React from 'react';
import { useLocation } from 'react-router-dom';


function MoviesCard(props) {
  const location = useLocation();

  return (
    <>
      <li className='movie'>
        <a target="_blank" href='/' rel="noreferrer">
          <img className="movie__image" alt='пропс.альт' src='https://get.wallhere.com/photo/Kimetsu-no-Yaiba-Yoriichi-Slayer-anime-boys-simple-background-minimalism-2146273.jpg' />
        </a>
        
        <div className="movie__container">
          <div className="movie__info">
            <div className="movie__title">33 слова о дизайне</div>
            <button className={`movie__icon 
            ${location.pathname === '/movies'
                ? `movie__like ${props.isLiked && 'movie__like_active'}`
                : 'movie__remove'
              }`}
              type="button" />
          </div>
          <div className="movie__duration">1ч42</div>
        </div>
      </li>
    </>
  )
}


export default MoviesCard;