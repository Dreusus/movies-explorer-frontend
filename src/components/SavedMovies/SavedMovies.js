import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';

function SavedMovies() {

  const [isBurgerMenuOpen, setBurgerMenuOpen] = React.useState(false);       /*   {костыль для верстки)) } */
  const [loggedIn, setLoggedIn] = React.useState(false);

  function toggleBurgerMenu() {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  }


  return (
    <>
    <Header Menu={toggleBurgerMenu} isMenuOpen={isBurgerMenuOpen} loggedIn={!loggedIn} />  {/*  костыль */}
      <section className='section__movies'>
        <SearchForm />
        <MoviesCardList 
        isHidden
        />
      </section>
      <Footer/>
      
    </>
  )

}
export default SavedMovies;