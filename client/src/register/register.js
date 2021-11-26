import * as React from 'react';
import './register.css'
import Header from '../header/header.js';
import { useState } from 'react';
import { Link } from "react-router-dom";
import Footer from '../footer/footer';
import DocumentMeta from 'react-document-meta';
const inputValidation = require('./inputValidation.js');

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const meta = {
    title: 'Filmie: Sign up',
    description: "Create your Filmie account",
    canonical: 'https://www.filmie.org',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'movie,cinema,film,sign-up,register,registration'
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const [errorMessage, result] = inputValidation.isInputValid(email, password);
    if (!result) {
      setErrorMessage(errorMessage);
      setError(true);
      return;
    }
    const formBody = encodeURIComponent("email") + '=' + encodeURIComponent(email) + '&'
      + encodeURIComponent("password") + '=' + encodeURIComponent(password) + '&'
      + encodeURIComponent("name") + '=' + encodeURIComponent(name) + '&'
      + encodeURIComponent("surname") + '=' + encodeURIComponent(surname);

    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody,
    }).then(response => {

      if (response.status === 450) return;
      if (response.status === 451) {
        setErrorMessage("An account with this email already exists")
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
    <DocumentMeta {...meta}>
      <div className="container">
        <Header></Header>
        <div className="middleContainer">
          <h1 className="formTitle">Sign up</h1>
          <form className="loginForm" onSubmit={handleSubmit}>

            <div class="inputNormal input-effect">
              <input name="name" className={name === "" ? "effect-20" : "effect-20 has-content"} type="text" placeholder="" onChange={(e) => setName(e.target.value)} />
              <label>Name</label>
              <span class="focus-border">
                <i></i>
              </span>
            </div>

            <div class="inputNormal input-effect">
              <input name="surname" className={surname === "" ? "effect-20" : "effect-20 has-content"} type="text" placeholder="" onChange={(e) => setSurname(e.target.value)} />
              <label>Surname</label>
              <span class="focus-border">
                <i></i>
              </span>
            </div>

            <div class="inputNormal input-effect">
              <input name="email" className={email === "" ? "effect-20" : "effect-20 has-content"} type="text" placeholder="" onChange={(e) => setEmail(e.target.value)} />
              <label>E-mail</label>
              <span class="focus-border">
                <i></i>
              </span>
            </div>

            <div className={error ? "inputError input-effect" : "inputNormal input-effect"}>
              <input name="password" class={password === "" ? "effect-20" : "effect-20 has-content"} type="password" placeholder="" onChange={(e) => setPassword(e.target.value)} />
              <label>Password</label>
              <span class="focus-border">
                <i></i>
              </span>
            </div>
            {error ? <div className="errorMessage">{errorMessage}</div> : null}
            <button className="registerButton" type="submit" value="Submit">Register</button>
            <Link className="sign" to="/login">Already have an account? Sign in</Link>
            <div className="copyright">Copyright @ <Link className="linkCopyright" to="/">Filmie</Link> 2021</div>
          </form>
        </div>
        <Footer isFixed={true}></Footer>
      </div>
    </DocumentMeta>
  );
}