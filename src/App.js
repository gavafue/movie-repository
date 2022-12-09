//Libraries
import "./css/bootstrap.min.css";
//Components
import React from "react";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import RoutesList from "./Components/MoviesList";
import PageNotFound from "./Components/PageNotFound";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import MovieDetails from "./Components/MovieDetails";
import PrivateRoute from "./Components/PrivateRoute";
function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
          <Route
            path="/list"
            element={
              <PrivateRoute>
                <RoutesList />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/details"
            element={
              <PrivateRoute>
                <MovieDetails />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
