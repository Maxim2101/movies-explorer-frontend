import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <div className="project" id="aboutProject">
      <div className="project__wrapper">
        <h2 className="project__about">О проекте</h2>
        <div className="project__block">
          <div className="project__item">
            <h3 className="project__name">Дипломный проект включал 5 этапов</h3>
            <p className="project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="project__item">
            <h3 className="project__name">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="project__time">
          <div className="project__backend">1 неделя</div>
          <div className="project__frontend">4 недели</div>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
