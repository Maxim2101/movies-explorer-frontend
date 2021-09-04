import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  ifMovies,
  inFilm,
  saveCard,
  deleteCard,
  inSavedMovies,
  inErrorFetch,
  inNullSearch,
  inPreloader,
  moreCard,
  buttonDisable,
}) {
  return (
    <>
      {inErrorFetch && (
        <p className="cardList__fetch">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      )}
      {inNullSearch && <p className="cardList__fetch">Ничего не найдено</p>}
      {inPreloader && <Preloader />}
      <ul className="cardList">
        {inFilm.map((card) => {
          return (
            <MoviesCard
              card={card}
              key={card.id || card._id}
              saveCard={saveCard}
              deleteCard={deleteCard}
              inSavedMovies={inSavedMovies}
            />
          );
        })}
      </ul>
      {ifMovies && buttonDisable.length > 0 && (
        <button className="cardList__btn" onClick={moreCard}>
          Еще
        </button>
      )}
    </>
  );
}

export default MoviesCardList;
