//Libraries
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./css/font.css";

//Components
// import MoviesList from "./Components/MoviesList";
const LazyMoviesList = React.lazy(() => import("./Components/MoviesList"));
// import PageNotFound from "./Components/PageNotFound";
const LazyPageNotFound = React.lazy(() => import("./Components/PageNotFound"));
// import MovieDetails from "./Components/MovieDetails";
const LazyMovieDetails = React.lazy(() => import("./Components/MovieDetails"));
// import PrivateRoute from "./Components/PrivateRoute";
const LazyPrivateRoute = React.lazy(() => import("./Components/PrivateRoute"));
// import Landing from "./Components/Landing";
const LazyLanding = React.lazy(() => import("./Components/Landing"));
// import SeriesList from "./Components/SeriesList";
const LazySeriesList = React.lazy(() => import("./Components/SeriesList"));
// import SerieDetails from "./Components/SerieDetails";
const LazySerieDetails = React.lazy(() => import("./Components/SerieDetails"));
// import Login2 from "./Components/Login2";
const LazyLogin = React.lazy(() => import("./Components/Login2"));
// import Register from "./Components/Register";
const LazyRegister = React.lazy(() => import("./Components/Register"));
// import Loader from "./Components/Loader";
const LazyLoader = React.lazy(() => import("./Components/Loader"));

function App() {
  return (
    <div style={{ backgroundColor: "#00000010" }}>
      <React.Suspense fallback={<LazyLoader />}>
        <Routes>
          <Route path="/" exact element={<Navigate to="/home" />} />
          <Route path="/login" exact element={<LazyLogin />} />
          <Route path="/register" element={<LazyRegister />} />
          <Route
            path="/home"
            element={
              <LazyPrivateRoute notLogged={true}>
                <LazyLanding />
              </LazyPrivateRoute>
            }
          />
          <Route
            path="/movies"
            exact
            element={
              <LazyPrivateRoute>
                <LazyMoviesList />
              </LazyPrivateRoute>
            }
          />
          <Route
            path="movies/details"
            element={
              <LazyPrivateRoute>
                <LazyMovieDetails />
              </LazyPrivateRoute>
            }
          />
          <Route
            path="/series"
            exact
            element={
              <LazyPrivateRoute>
                <LazySeriesList />
              </LazyPrivateRoute>
            }
          />
          <Route
            path="series/details"
            element={
              <LazyPrivateRoute>
                <LazySerieDetails />
              </LazyPrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              <LazyPrivateRoute>
                <LazyPageNotFound />
              </LazyPrivateRoute>
            }
          />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
