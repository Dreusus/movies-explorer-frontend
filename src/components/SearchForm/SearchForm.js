import React from 'react';

function SearchForm() {
  return (
    <section className="search">
      <div className="search__panel">
        <form className='search__container'>
          <div className='search__container-up'>
            <input type="search" placeholder="Фильм" className="input search__input" />
            <button className='search__button'></button>
          </div>
          <div className='search__container-down'>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <div className="search__shortfilm-text">Короткометражки</div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default SearchForm;