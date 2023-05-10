import React from 'react';
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

function SearchForm({
  searchMovie,
  handlerShortMovies,
  isPreloaderActive,
  searchMessage
}) {


  const location = useLocation();

  const [movieInput, setMovieInput]
    = useState(location.pathname === '/movies' ? localStorage.getItem('input') || '' : '')

  const inputHandler = (e) => {
    setMovieInput(e.target.value);
    location.pathname === '/movies' ? localStorage.setItem('input', e.target.value) : <></>;
  }

  const submitForm = (e) => {
    e.preventDefault();
    searchMovie(movieInput);
  }


  return (
    <section className="search">
      <div className="search__panel">
        <form
          className='search__container'
          onSubmit={submitForm}
        >
          <div className='search__container-up'>
            <input
              type="search"
              placeholder="Фильм"
              className="input search__input"
              required
              value={movieInput}
              onChange={inputHandler}

            />
            <button
              className='search__button'
              type='submit'

            ></button>
          </div>
          <div className='search__container-down'>
            <label className='switch'>
              <input
                type='checkbox'
                onChange={handlerShortMovies}

              />
              <span className='slider'></span>
            </label>
            <div className='search__shortfilm-text'>Короткометражки</div>
          </div>
          {searchMessage ?
            <span className='search__span'>{searchMessage}</span>
            : ''}
        </form>
      </div>
      {isPreloaderActive && <Preloader />}
    </section>
  )
}

export default SearchForm;