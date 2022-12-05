import React from "react";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import RoutesList from "./Components/MoviesList";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Login />}></Route>
        <Route path="/list" element={<RoutesList />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
