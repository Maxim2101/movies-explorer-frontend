import React from "react";
import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function SavedMovies(props) {
  return (
    <>
      <Header {...props} />
      <div className="movies">
        <SearchForm {...props} />
        <MoviesCardList {...props} />
      </div>
      <Footer />
    </>
  );
}

export default SavedMovies;
