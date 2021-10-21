import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import SignInSide from './login/login.js';
import Home from './home/home.js'
import Register from './register/register.js'
import Profile from './profile/profile.js'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Home/>}></Route>
        <Route path="/login" exact component={() => <SignInSide/>}></Route>
        <Route path="/register" exact component={() => <Register/>}></Route>
        <Route path="/profile" exact component={() => <Profile/>}></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
