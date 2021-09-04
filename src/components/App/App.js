import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Login from "../Login/Login";
import Register from "../Register/Rigister";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import SavedMovies from "../SavedMovies/SavedMovies";
import auth from "../../utils/auth";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import { calculate, LINKAPI, timeDuration } from "../../utils/config";

function App() {
  //Start and data user
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState([]);
  //Block from card
  const [inFilm, setFilm] = React.useState([]);
  const [inSavedMovies, setSavedMovies] = React.useState([]);
  //Block render
  const [inRender, setRender] = React.useState([]);
  const [inMoreCard, setMoreCard] = React.useState(false);
  //Block counter
  const buttonDisable = inFilm;
  //Block visibly effect
  const [inWindowWidth, setWindowWidth] = React.useState([]);
  //Errors
  const [inLoginOrRegister, setLoginOrRegister] = React.useState(false);
  const [inProfileTrue, setProfileTrue] = React.useState(false);
  const [inProfileError, setProfileError] = React.useState(false);
  const [inErrorFetch, setErrorFetch] = React.useState(false);
  const [inNullSearch, setNullSearch] = React.useState(false);
  //Effect
  const [inPreloader, setPreloader] = React.useState(false);
  //Other
  const history = useHistory();


  function sendRegister(data) {
    const { name, email, password } = data;
    auth
      .register(name, email, password)
      .then(() => {
        sendLogin({ email, password });
      })
      .catch((err) => {
        console.log(err);
        setLoginOrRegister(true);
        setTimeout(function () {
          setLoginOrRegister(false);
        }, 5000);
      });
  }
  function sendLogin(data) {
    const { email, password } = data;
    auth
      .login(email, password)
      .then((data) => {
        setCurrentUser(data);
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
        setLoginOrRegister(true);
        setTimeout(function () {
          setLoginOrRegister(false);
        }, 5000);
      });
  }
  React.useEffect(() => {
    auth.getContent().then((data) => {
      setLoggedIn(true);
      setCurrentUser(data);
      history.push("/movies");
    });
  }, [loggedIn]);

  function endSession() {
    auth.signOut().then(() => {
      setLoggedIn(false);
      localStorage.clear();
      localStorage.removeItem("movieInSearch");
      localStorage.removeItem("movieInSearchCheckbox");
    });
  }
  function sendEditProfile(data) {
    mainApi
      .updateProfile(data)
      .then((data) => {
        setCurrentUser(data);
        setProfileTrue(true);
      })
      .catch((err) => {
        console.log(err);
        setProfileError(true);
      });
    setTimeout(function () {
      setProfileTrue(false) || setProfileError(false);
    }, 5000);
  }

  function searchMovies(data) {
    setPreloader(true);
    moviesApi
      .getMovies()
      .then((movie) => {
        sort(movie, data);
        setPreloader(false);
      })
      .catch((err) => {
        console.log(err);
        console.log("ошибка");
        setErrorFetch(true);
        setPreloader(false);
        setTimeout(function () {
          setErrorFetch(false) || setPreloader(false);
        }, 3000);
      });
  }
  function sort(movie, data) {
    const saveCorrect = movie.map((item) => {
      return {
        ...item,
        country: item.country ? item.country : "Нет данных",
        director: item.director,
        duration: item.duration,
        year: item.year,
        description: item.description,
        image: `${LINKAPI}${item.image.url}`,
        trailer: item.trailerLink,
        nameRU: item.nameRU,
        nameEN: item.nameEN ? item.nameEN : "Нет данных",
        thumbnail: `${LINKAPI}${item.image.formats.thumbnail.url}`,
        movieId: item.id,
      };
    });
    saveInPage(data, saveCorrect);
  }
  function saveInPage(data, saveCorrect) {
    const { input, checkbox } = data;
    const filterName = saveCorrect.filter((i) => {
      if (!i.nameRU) {
        if (i.nameEN) {
          return i.nameEN.toLowerCase().includes(input.toLowerCase());
        }
      } else {
        return i.nameRU.toLowerCase().includes(input.toLowerCase());
      }
    });
    const filterDuration = filterName.filter((i) => {
      return i.duration <= timeDuration;
    });
    if (!checkbox) {
      setFilm(filterName);
      localStorage.setItem("movieInSearch", JSON.stringify(filterName));
      localStorage.removeItem("movieInSearchCheckbox");
    } else {
      setFilm(filterDuration);
      localStorage.setItem(
        "movieInSearchCheckbox",
        JSON.stringify(filterDuration)
      );
      localStorage.removeItem("movieInSearch");
    }
    if (filterName.length === 0) {
      setNullSearch(true);
      setTimeout(function () {
        setNullSearch(false);
        return setFilm(inFilm);
      }, 3000);
    }
  }
  React.useEffect(() => {
    if (loggedIn && localStorage.getItem("movieInSearch")) {
      setFilm(JSON.parse(localStorage.getItem("movieInSearch")));
    }
    if (loggedIn && localStorage.getItem("movieInSearchCheckbox")) {
      setFilm(JSON.parse(localStorage.getItem("movieInSearchCheckbox")));
    }
  }, [loggedIn]);

  function searchSaveMovies(data) {
    const { input, checkbox } = data,
      filterName = inSavedMovies.filter((i) => {
        if (!i.nameRU) {
          if (i.nameEN) {
            return i.nameEN.toLowerCase().includes(input.toLowerCase());
          }
        } else {
          return i.nameRU.toLowerCase().includes(input.toLowerCase());
        }
      }),
      filterDuration = filterName.filter((i) => {
        return i.duration <= timeDuration;
      });
    if (!checkbox) {
      setSavedMovies(filterName);
      if (filterName.length === 0) {
        setNullSearch(true);
        setTimeout(function () {
          setNullSearch(false);
          return setSavedMovies(inSavedMovies);
        }, 3000);
      }
    } else {
      setSavedMovies(filterDuration);
    }
  }
  function saveCard(card) {
    const result = inSavedMovies.filter(
      (item) => item.movieId === card.id && item.movieId === card.movieId
    );
    if (result.length > 0) {
      deleteCard(result[0]);
    } else {
      mainApi.addMovies(card).then(() => {
        setSavedMovies(result);
        renderData();
      });
    }
  }
  function deleteCard(card) {
    mainApi
      .deleteMovie(card)
      .then((movie) => {
        const result = inSavedMovies.filter(
          (item) => item.movieId !== movie.id && item.movieId !== movie.movieId
        );
        setSavedMovies(result);
        renderData(result);
        if (inSavedMovies.length === 1) {
          setSavedMovies([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function renderData(card) {
    mainApi
      .returnMovies(card)
      .then((data) => {
        setSavedMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  React.useEffect(() => {
    mainApi
      .returnMovies()
      .then((data) => {
        setSavedMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  React.useEffect(() => {
    const changeOnResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeOnResize);
    changeOnResize();
    return () => window.removeEventListener("resize", changeOnResize);
  }, [inFilm]);

  React.useEffect(() => {
    const { firstParsing } = calculate(inWindowWidth);
    const spliceRender = inFilm.splice(0, firstParsing);
    setRender(spliceRender);
  }, [inFilm]);

  function moreCard() {
    if (inMoreCard) {
      setMoreCard(false);
      const { lastParsing } = calculate(inWindowWidth);
      const spliceRender = inFilm.splice(0, lastParsing);
      inRender.push(...spliceRender);
    }
  }

  React.useEffect(() => {
    setMoreCard(true);
  }, [inMoreCard]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            ifMovies={true}
            makeSearch={searchMovies}
            inFilm={inRender}
            saveCard={saveCard}
            inSavedMovies={inSavedMovies}
            inErrorFetch={inErrorFetch}
            inNullSearch={inNullSearch}
            inPreloader={inPreloader}
            moreCard={moreCard}
            buttonDisable={buttonDisable}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            makeSearch={searchSaveMovies}
            saveCard={saveCard}
            inFilm={inSavedMovies}
            inSavedMovies={inSavedMovies}
            deleteCard={deleteCard}
            inNullSearch={inNullSearch}
            inPreloader={inPreloader}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            sendEditProfile={sendEditProfile}
            endSession={endSession}
            inProfileTrue={inProfileTrue}
            inProfileError={inProfileError}
          />

          <Route path="/signin">
            <Login
              sendLogin={sendLogin}
              inLoginOrRegister={inLoginOrRegister}
            />
          </Route>
          <Route path="/signup">
            <Register
              sendRegister={sendRegister}
              inLoginOrRegister={inLoginOrRegister}
            />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
