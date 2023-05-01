import React from 'react';

function AboutProject() {
  return (
    <section className="project">
      <h2 className="project__title">О проекте</h2>
      <hr className="project__hr-line"></hr>
      <ul className="project-items">
        <li className="project-item">
          <h3 className="project-item__title">Дипломный проект включал 5&nbsp;этапов</h3>
          <p className="project-item__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="project-item">
          <h3 className="project-item__title">На выполнение диплома ушло 5&nbsp;недель</h3>
          <p className="project-item__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>

      <ul className="progress-items">
        <li className="progress-item">
          <div className="progress-item__weeks progress-item__weeks_theme_dark">1 неделя</div>
          <p className="progress-item__subtitle">Back-end</p>
        </li>
        <li className="progress-item">
          <div className="progress-item__weeks">4 неделя</div>
          <p className="progress-item__subtitle">Front-end</p>
        </li>
      </ul>
    </section>
  )
}

export default AboutProject;