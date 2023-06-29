import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/" exact>
        <LoginPage />
        </Route>
      <Route path="/cards" exact>
        <CardPage />
    </Route>
    <Redirect to="/" />
    </Switch>
  </Router>
);
}

export default App;
