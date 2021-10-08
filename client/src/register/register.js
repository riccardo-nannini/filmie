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


    function handleSubmit() {
        return;
    }

    useEffect(() => {
        console.log(email)
        console.log(password)
    }, [email, password])

    return (
        <div className="container">
            <Header></Header>
            <div className="middleContainer">
                <h1 className="formTitle">Sign up</h1>
                <form className="loginForm" onSubmit={handleSubmit}>

                    <div class="col-3 input-effect">
                        <input className={name === "" ? "effect-20" : "effect-20 has-content"} type="text" placeholder="" onChange={(e) => setName(e.target.value)} />
                        <label>Name</label>
                        <span class="focus-border">
                            <i></i>
                        </span>
                    </div>

                    <div class="col-3 input-effect">
                        <input className={surname === "" ? "effect-20" : "effect-20 has-content"} type="text" placeholder="" onChange={(e) => setSurname(e.target.value)} />
                        <label>Surname</label>
                        <span class="focus-border">
                            <i></i>
                        </span>
                    </div>

                    <div class="col-3 input-effect">
                        <input className={email === "" ? "effect-20" : "effect-20 has-content"} type="text" placeholder="" onChange={(e) => setEmail(e.target.value)} />
                        <label>E-mail</label>
                        <span class="focus-border">
                            <i></i>
                        </span>
                    </div>

                    <div class="col-3 input-effect">
                        <input class={password === "" ? "effect-20" : "effect-20 has-content"} type="text" placeholder="" onChange={(e) => setPassword(e.target.value)} />
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