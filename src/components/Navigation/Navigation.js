import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navigation(props) {
  function toggleBurgerMenu() {
    props.onOpenMenu();
  }

  return (
    <>
      <div
        className={`header__movies-nav ${props.loggedIn && 'header__movies-nav_active'
          } `}
      >
        <NavLink to="/movies" className="header__link-movies active-element">
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className="header__link-favourites active-element"
        >
          Сохраненные&#160;фильмы
        </NavLink>
      </div>

      <div
        className={`header__account-nav ${props.loggedIn && 'header__account-nav_active'
          } `}
      >
        <Link to="/profile" className="header__account-button active-element">
          Аккаунт
        </Link>
      </div>


      <div
        className={`header__menu-icon ${props.isMenuOpen
          ? 'header__menu-icon_active header__menu-icon_fixed'
          : !props.loggedIn && 'header__menu-icon_unactive'
          }`}
        onClick={toggleBurgerMenu}
      >
        {' '}
        <span></span>
      </div>

      <div
        onClick={toggleBurgerMenu}
        className={`header__menu ${props.isMenuOpen && 'header__menu_opened'}`}
      >
        <div
          className={`header__menu-container ${props.isMenuOpen && 'header__menu-container_opened'
            }`}
        >
          <ul className="menu-items">
            <li className="menu-item">
              {' '}
              <NavLink
                to="/"
                className="menu-item-link active-element"
              >
                Главная
              </NavLink>
            </li>
            <li className="menu-item">
              {' '}
              <NavLink to="/movies" className="menu-item-link active-element">
                Фильмы
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/saved-movies"
                className="menu-item-link active-element"
              >
                Сохраненные&#160;фильмы
              </NavLink>
            </li>
          </ul>

          <div className="menu__account-nav">
            <Link to="/profile" className="menu__account-button active-element">
              Аккаунт
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
