import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../pages/home";
import ErrorPage from "../pages/error";
import GenrePage from "../pages/genre";
import GamePage from "../pages/game";
import SearchPage from "../pages/search";
import AccountPage from "../pages/account";
import ProfilePage from "../pages/profile";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
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
            <Route path="/search" element={<SearchPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<AccountPage />} /> // da proteggere
            <Route path="/profile" element={<ProfilePage />} /> // da proteggere
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
