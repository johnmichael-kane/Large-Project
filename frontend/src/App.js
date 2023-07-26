import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import RegisterPage from './pages/RegisterPage';
import VerificationPage from './pages/VerificationPage';
import PasswordPage from './pages/PasswordPage';
import FoodPage from './pages/FoodPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/meals" index element={<CardPage />} />
      <Route path="/register" index element={<RegisterPage />} />
      <Route path="/emailAuthorization" index element={<VerificationPage />} />
      <Route path="/passwordReset" index element={<PasswordPage />} />
      <Route path="/foods" index element={<FoodPage />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;
