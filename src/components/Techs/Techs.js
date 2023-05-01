import React from 'react';

function Techs() {
  return (
    <section className="techs">
      <h2 className="section-title">Технологии</h2>
      <hr className="project__hr-line"/>
      <h3 className="techs-title">7 технологий</h3>
      <p className="techs-subtitle"> На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.</p>
      <ul className="techs-items">
        <li className="techs-item">
          <p className="techs-item__text">HTML</p>
        </li>
        <li className="techs-item">
          <p className="techs-item__text">CSS</p>
        </li>
        <li className="techs-item">
          <p className="techs-item__text">JS</p>
        </li>
        <li className="techs-item">
          <p className="techs-item__text">React</p>
        </li>
        <li className="techs-item">
          <p className="techs-item__text">Git</p>
        </li>
        <li className="techs-item">
          <p className="techs-item__text">Express.js</p>
        </li>
        <li className="techs-item">
          <p className="techs-item__text">mongoDB</p>
        </li>
      </ul>
    </section>
  )
}

export default Techs;