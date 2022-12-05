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

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
          <Route path="/list" element={<RoutesList />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
