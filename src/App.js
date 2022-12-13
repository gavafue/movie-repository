//Libraries
import "./css/bootstrap.min.css";

//Components
import React from "react";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import RoutesList from "./Components/MoviesList";
import PageNotFound from "./Components/PageNotFound";
import MovieDetails from "./Components/MovieDetails";
import PrivateRoute from "./Components/PrivateRoute";
import Landing from "./Components/Landing";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./css/font.css";
import Loader from "./Components/Loader";
function App() {
  return (
    <div style={{ fontFamily: "Roboto" }}>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/loader" exact element={<Loader />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Landing />
            </PrivateRoute>
          }
        />
        <Route
          path="/movies"
          exact
          element={
            <PrivateRoute>
              <RoutesList />
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
          path="*"
          element={
            <PrivateRoute>
              <PageNotFound />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
