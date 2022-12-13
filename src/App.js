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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/home" element={<PrivateRoute>Probando</PrivateRoute>} />
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
    </>
  );
}

export default App;
