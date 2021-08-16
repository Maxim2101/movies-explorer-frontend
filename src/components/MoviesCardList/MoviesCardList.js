import React, { useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import testCard from "../../utils/utils";

function MoviesCardList({ ifMovies }) {
  const [inFilm, setFilm] = React.useState([]);

  useEffect(() => {
    setFilm([...inFilm, ...testCard]);
  }, [testCard]);

  return (
    <>
      <ul className="cardList">
        {inFilm.map((card) => {
          return <MoviesCard card={card} key={card.id} />;
        })}
      </ul>
      {ifMovies && <button className="cardList__btn">Еще</button>}
    </>
  );
}

export default MoviesCardList;
