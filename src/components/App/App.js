import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Login from "../Login/Login";
import Register from "../Register/Rigister";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";

function App() {
  // const [ loggedIn, setLoggedIn] = React.useState(false)

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header ifLoginIn={false} />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header ifLoginIn={true} />
          <Movies ifMovies={true} />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header ifLoginIn={true} />
          <Movies />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header ifLoginIn={true} />
          <Profile name="Name" />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
