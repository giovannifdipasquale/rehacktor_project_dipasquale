import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../pages/home";
import ErrorPage from "../pages/error";
import GenrePage from "../pages/genre";
import GamePage from "../pages/game";
import Layout from "../layout/Layout";
function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/games/:genre" element={<GenrePage />} />
            <Route path="/games/:slug/:id" element={<GamePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
