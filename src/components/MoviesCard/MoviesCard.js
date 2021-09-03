import React from "react";
import "./MoviesCard.css";
import { Route } from "react-router-dom";
import { time } from "../../utils/config";
function MoviesCard({ card, saveCard, inSavedMovies, deleteCard }) {
  const { nameRU, nameEN, duration, image } = card;
  function handleLike() {
    saveCard(card);
  }
  function handleDelete() {
    deleteCard(card);
  }
  const isLiked = inSavedMovies.some(
    (i) => i.movieId === card.id || i.movieId === card.movieId
  );
  const cardLike = `card__like ${isLiked ? "card__time_active" : ""}`;
  return (
    <li className="card">
      <div className="card__about">
        <h2 className="card__name">{nameRU || nameEN}</h2>
        <p className="card__time">{time(duration)}</p>
        <Route path="/movies">
          <button type="button" className="card__btn" onClick={handleLike}>
            <div className={cardLike} />
          </button>
        </Route>
        <Route path="/saved-movies">
          <button type="button" className="card__btn" onClick={handleDelete}>
            <div className="card__del" />
          </button>
        </Route>
      </div>
      <img src={image} alt="Фото фильма" className="card__photo" />
    </li>
  );
}

export default MoviesCard;
