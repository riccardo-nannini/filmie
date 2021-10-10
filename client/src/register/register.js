import * as React from 'react';
import './register.css'
import Header from '../header.js';
import { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")

    return (
        <div className="container">
            <Header></Header>
            <div className="middleContainer">
                <h1 className="formTitle">Sign up</h1>
                <form className="loginForm" action="/register" method="post">

                    <div class="col-4 input-effect">
                        <input name="name" className={name === "" ? "effect-20" : "effect-20 has-content"} type="text" placeholder="" onChange={(e) => setName(e.target.value)} />
                        <label>Name</label>
                        <span class="focus-border">
                            <i></i>
                        </span>
                    </div>

                    <div class="col-4 input-effect">
                        <input name="surname" className={surname === "" ? "effect-20" : "effect-20 has-content"} type="text" placeholder="" onChange={(e) => setSurname(e.target.value)} />
                        <label>Surname</label>
                        <span class="focus-border">
                            <i></i>
                        </span>
                    </div>

                    <div class="col-4 input-effect">
                        <input name="email" className={email === "" ? "effect-20" : "effect-20 has-content"} type="text" placeholder="" onChange={(e) => setEmail(e.target.value)} />
                        <label>E-mail</label>
                        <span class="focus-border">
                            <i></i>
                        </span>
                    </div>

                    <div class="col-4 input-effect">
                        <input name="password" class={password === "" ? "effect-20" : "effect-20 has-content"} type="password" placeholder="" onChange={(e) => setPassword(e.target.value)} />
                        <label>Password</label>
                        <span class="focus-border">
                            <i></i>
                        </span>
                    </div>

                    <button type="submit" value="Submit">Register</button>
                    <Link className="sign" to="/">Already have an account? Sign in</Link>
                    <div className="copyright">Copyright @ <Link to="/home">Filmie</Link> 2021</div>
                </form>
            </div>
        </div>
    );
}