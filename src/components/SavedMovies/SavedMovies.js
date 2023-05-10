import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import { useState, useEffect } from "react";

function SavedMovies({
  cards,
  searchMovie,
  handleSave,
  isPreloaderActive,
  handleRemove,
  savedMovies,
  handlerShortMovies,
  shortMovies,
  searchMessage
}) {

  return (
    <>
      <section className='section__movies'>
        <SearchForm
          searchMessage={searchMessage}
          searchMovie={searchMovie}
          handlerShortMovies={handlerShortMovies}
          shortMovies={shortMovies}
          isPreloaderActive={isPreloaderActive}
        />
        <MoviesCardList
          cards={cards}
          handleRemove={handleRemove}
          handleSave={handleSave}
          savedMovies={savedMovies}
        />
      </section>
      <Footer />

    </>
  )

}
export default SavedMovies;