import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import SignInSide from './login/login.js';
import Home from './home/home.js';
import Register from './register/register.js';
import Profile from './profile/profile.js';
import Movie from './movie/movie.js'
import Tv from './tv/tv.js'
import Search from './search/search.js'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Home/>}></Route>
        <Route path="/login" exact component={() => <SignInSide/>}></Route>
        <Route path="/register" exact component={() => <Register/>}></Route>
        <Route path="/profile" exact component={() => <Profile/>}></Route>
        <Route path="/movie/:movieid" component={(props) => <Movie {...props}/>}></Route>
        <Route path="/search" component={(props) => <Search {...props}/>}></Route>
        <Route path="/tv/:tvid" exact component={(props) => <Tv {...props}/>}></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
