//Libraries
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./css/font.css";
import PrivateRoute from "./Components/PrivateRoute";
import { useDispatch } from "react-redux";
//Components
import MoviesList from "./Components/MoviesList";
// const MoviesList = React.lazy(() => import("./Components/MoviesList"));
import PageNotFound from "./Components/PageNotFound";
// const LazyPageNotFound = React.lazy(() => import("./Components/PageNotFound"));
import MovieDetails from "./Components/MovieDetails";
// const LazyMovieDetails = React.lazy(() => import("./Components/MovieDetails"));

import Landing from "./Components/Landing";
// const LazyLanding = React.lazy(() => import("./Components/Landing"));
import SeriesList from "./Components/SeriesList";
// const LazySeriesList = React.lazy(() => import("./Components/SeriesList"));
import SerieDetails from "./Components/SerieDetails";
// const LazySerieDetails = React.lazy(() => import("./Components/SerieDetails"));
import Login from "./Components/Login";
// const LazyLogin = React.lazy(() => import("./Components/Login"));
import Register from "./Components/Register";
// const LazyRegister = React.lazy(() => import("./Components/Register"));
// import Loader from "./Components/Loader";
import Favourites from "./Components/Favourites";
import { setFavorite } from "./redux/Favorites/favouritesSlice";
// const LazyLoader = React.lazy(() => import("./Components/Loader"));

function App() {
  const favList = localStorage.getItem("favourites");
  const dispatch = useDispatch();
  if (favList) {
    dispatch(setFavorite(JSON.parse(favList)));
  }
  return (
    <div style={{ backgroundColor: "#00000010" }}>
      {/* <React.Suspense fallback={<Loader />}> */}
      <Routes>
        <Route path="/" exact element={<Navigate to="/home" />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favs" element={<Favourites />} />
        <Route
          path="/home"
          element={
            <PrivateRoute notLogged={true}>
              <Landing />
            </PrivateRoute>
          }
        />
        <Route
          path="/movies"
          exact
          element={
            <PrivateRoute>
              <MoviesList />
            </PrivateRoute>
          }
        />
        <Route
          path="movies/details"
          element={
            <PrivateRoute>
              <MovieDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/series"
          exact
          element={
            <PrivateRoute>
              <SeriesList />
            </PrivateRoute>
          }
        />
        <Route
          path="series/details"
          element={
            <PrivateRoute>
              <SerieDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <PageNotFound />
            </PrivateRoute>
          }
        />
      </Routes>
      {/* </React.Suspense> */}
    </div>
  );
}

export default App;
