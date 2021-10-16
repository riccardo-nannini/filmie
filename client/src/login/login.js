import * as React from 'react';
import './login.css'
import Header from '../header/header.js';
import { useState } from 'react';
import { Link } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const formBody = encodeURIComponent("email")+'='+encodeURIComponent(email)+'&'
      +encodeURIComponent("password")+'='+encodeURIComponent(password);
    
    fetch("/login", {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: formBody,
    }).then(response => {
      if (response.status === 403) {
        setErrorMessage("Incorrect password or email");
        setError(true);
        return;
      }
      if (response.redirected) {
        window.location.href = response.url;
        return;
      }
    });
  }

  return (
    <div className="container">
      <Header></Header>
      <div className="middleContainer">
        <h1 className="formTitle">Sign in</h1>
        <div className="loginForm">
          <form onSubmit={handleSubmit}>

            <div className="input1 input-effect">
              <input name="email" className={email === "" ? "effect-20" : "effect-20 has-content"} type="text" placeholder="" onChange={(e) => setEmail(e.target.value)} required/>
              <label>E-mail</label>
              <span class="focus-border">
                <i></i>
              </span>

            </div>
            <div className={error? "input2 input-effect":"input1 input-effect"}>
              <input name="password" class={password === "" ? "effect-20" : "effect-20 has-content"} type="password" placeholder="" onChange={(e) => setPassword(e.target.value)} required />
              <label>Password</label>
              <span class="focus-border">
                <i></i>
              </span>

            </div>
            {error? <div className="errorMessageLogin">{errorMessage}</div> : null}
            <button type="submit" value="Submit">Login</button>
          </form>
          <Link className="signUp" to="/register">Don't have an account? Sign up</Link>
          <div className="copyright">Copyright @ <Link to="/home">Filmie</Link> 2021</div>

        </div>
      </div>
    </div>
  );
}