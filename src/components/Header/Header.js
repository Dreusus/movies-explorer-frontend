import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header(props) {

  return (
    <header className='header'> 
      <div className="header__container">
        <Link to="/" className="header__logo"></Link>

        <Navigation
          onOpenMenu={props.Menu}
          isMenuOpen={props.isMenuOpen}
          loggedIn={props.loggedIn}
        />

        <div
          className={`header__unauth-nav ${
            !props.loggedIn && 'header__unauth-nav_active'
          }`}
        >
          {' '}
          <Link to="/signup" className="active-element header__link-signup">
            Регистрация
          </Link>
          <Link to="/signin" className="active-element header__link-signin">
            <p className="header__link-signin__text">Войти</p>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
