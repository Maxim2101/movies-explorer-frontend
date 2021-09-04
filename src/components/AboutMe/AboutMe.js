import React from "react";
import "./AboutMe.css";
import photoStudent from "../../images/photo.png";

function AboutMe() {
  return (
    <div className="student" id="aboutStudent">
      <div className="student__wrapper">
        <h2 className="student__about">Студент</h2>
        <div className="student__header">
          <div className="student__profile">
            <h3 className="student__name">Студент</h3>
            <span className="student__direction">
              Фронтенд-разработчик, 30 лет
            </span>
            <p className="student__text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <ul className="student__soc">
              <li className="student__links">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://opensource.fb.com/"
                  className="student__link"
                >
                  Facebook
                </a>
              </li>
              <li className="student__links">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/"
                  className="student__link"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img
            src={photoStudent}
            alt="Фото студента"
            className="student__photo"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
