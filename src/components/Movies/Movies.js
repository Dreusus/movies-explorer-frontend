import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header.js';

function Movies() {

  const [isBurgerMenuOpen, setBurgerMenuOpen] = React.useState(false);       /*   {костыль для верстки)) } */
  const [loggedIn, setLoggedIn] = React.useState(false);

  function toggleBurgerMenu() {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  }

  
  return (
    <>
     <Header Menu={toggleBurgerMenu} isMenuOpen={isBurgerMenuOpen} loggedIn={!loggedIn} />  {/*  костыль */}
      <div className="section__movies">
        <SearchForm />
        <MoviesCardList/>
      </div>
      <Footer/>
    </>

  )
}

export default Movies;