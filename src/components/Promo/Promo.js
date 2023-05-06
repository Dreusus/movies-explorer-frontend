import React from 'react';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
      <h1 className="promo__title"> Учебный проект студента факультета Веб-разработки.</h1>
      <ul className="promo__nav">
        <li><button className="promo__button">О проекте</button></li>
        <li><button className="promo__button">Технологии</button></li>
        <li><button className="promo__button">Студент</button></li>
      </ul>
      </div>
    </section>
  )
}

export default Promo;