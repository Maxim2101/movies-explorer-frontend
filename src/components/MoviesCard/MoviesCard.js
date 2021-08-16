import React from "react";
import "./MoviesCard.css";
import { Route } from "react-router-dom";
function MoviesCard({ card }) {
  const [like, setLike] = React.useState(false);
  const handleClick = () => {
    setLike(!like);
  };
  // const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLike = `card__like ${like ? "card__time_active" : ""}`;
  return (
    <li className="card">
      <div className="card__about">
        <h2 className="card__name">{card.name}</h2>
        <p className="card__time">{card.time}</p>
        <Route path="/movies">
          <button type="button" className="card__btn" onClick={handleClick}>
            <div className={cardLike} />
          </button>
        </Route>
        <Route path="/saved-movies">
          <button type="button" className="card__btn">
            <div className="card__del" />
          </button>
        </Route>
      </div>
      <img src={card.link} alt="Фото фильма" className="card__photo" />
    </li>
  );
}

export default MoviesCard;
