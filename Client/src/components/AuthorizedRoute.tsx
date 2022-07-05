import React from "react";
import Home from "../pages/Home";
import { Route, Routes } from "react-router-dom";
function AuthorizedRoute() {
  return (
    <Home />
    // <Routes>
    //   <Route path="/" element={<Home />} />
    // </Routes>
  );
}

export default AuthorizedRoute;
