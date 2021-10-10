import * as React from 'react';
import './login.css'
import Header from '../header.js';
import { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const formBody = encodeURIComponent("email")+'='+encodeURIComponent(email)+'&'
      +encodeURIComponent("password")+'='+encodeURIComponent(password);
    console.log(email, " ", password)
    fetch("http://localhost/8080/login", {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: formBody,
    });

  }

  return (
    <div className="container">
      <Header></Header>
      <div className="middleContainer">
        <h1 className="formTitle">Sign in</h1>
        <div className="loginForm">
          <form action="/login" method="post">

            <div className="col-3 input-effect">
              <input name="email" className={email === "" ? "effect-20" : "effect-20 has-content"} type="text" placeholder="" onChange={(e) => setEmail(e.target.value)} />
              <label>E-mail</label>
              <span class="focus-border">
                <i></i>
              </span>

            </div>
            <div class="col-3 input-effect">
              <input name="password" class={password === "" ? "effect-20" : "effect-20 has-content"} type="password" placeholder="" onChange={(e) => setPassword(e.target.value)} />
              <label>Password</label>
              <span class="focus-border">
                <i></i>
              </span>

            </div>
            <button type="submit" value="Submit">Login</button>
          </form>
          <Link className="signUp" to="/register">Don't have an account? Sign up</Link>
          <div className="copyright">Copyright @ <Link to="/home">Filmie</Link> 2021</div>

        </div>
      </div>
    </div>
  );
}