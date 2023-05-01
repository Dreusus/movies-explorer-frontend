import React from 'react';
import Promo from '../Promo/Promo.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs from '../Techs/Techs.js';
import AboutMe from '../AboutMe/AboutMe.js';
import Portfolio from '../Portfolio/Portfolio.js'
import Footer from '../Footer/Footer.js'
import Header from '../Header/Header.js';

function Main(props) {
  const [isBurgerMenuOpen, setBurgerMenuOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  function toggleBurgerMenu() {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  }
  return (
    
    <>
    <Header Menu={toggleBurgerMenu} isMenuOpen={isBurgerMenuOpen} loggedIn={loggedIn} />    {/*  костыль для верстки */}
    <Promo/>
    <AboutProject/>
    <Techs/>
    <AboutMe/>
    <Portfolio/>
    <Footer/>
    </>
  )
}
export default Main;