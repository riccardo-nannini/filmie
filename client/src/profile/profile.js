import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../header/header.js';
import Footer from '../footer/footer.js';
import ProfileNav from './profileSideNav/profileSideNav.js';
import './profile.css';
const passVal = require('../register/inputValidation.js');


export default function Profile() {

  const menuValue = {
    update: 1,
    delete: 2,
    overview: 3
  }
  const [user, setUser] = useState({});
  const [menu, setMenu] = useState(menuValue.overview)
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confNewPass, setConfNewPass] = useState("");

  function handleUpdate(e) {
    e.preventDefault();

    if (newPass !== confNewPass) {
      setErrorMessage("Password and confirm password do not match")
      setError(true);
      setSuccess(false);
      return;
    }
    const [errorMessage, result] = passVal.isPasswordValid(newPass);
    if (!result) {
      setErrorMessage(errorMessage);
      setError(true);
      setSuccess(false);
      return;
    }
    const formBody = encodeURIComponent("oldPass") + '=' + encodeURIComponent(oldPass) + '&'
      + encodeURIComponent("newPass") + '=' + encodeURIComponent(newPass) + '&'
      + encodeURIComponent("confOldPass") + '=' + encodeURIComponent(confNewPass);

    fetch("/user", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody,
    }).then(response => {
      if (response.status === 451) {
        setErrorMessage("Password and confirm password do not match")
        setError(true);
        setSuccess(false);
        return;
      }
      if (response.status === 452) {
        setErrorMessage("Incorrect password")
        setError(true);
        setSuccess(false);
        return;
      }
      if (response.status === 200) {
        setSuccessMessage("Your password has been updated")
        setError(false);
        setSuccess(true);
        return;
      }
    });
  }

  function handleDelete(e) {
    e.preventDefault();

    fetch("/user", {
      method: "DELETE"
    }).then(response => {
      if (response.redirected) {
        window.location.href = response.url;
        return;
      }
    });
  }
  
  useEffect(() => {
    fetch("/user", {
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        setUser({
          id: data.id,
          name: data.name,
          surname: data.surname,
          email: data.email
        });
      });
  }, []);

  function clickUpdate() {
    setMenu(menuValue.update)
  }

  function clickDelete() {
    setMenu(menuValue.delete)
  }

  function clickOverview() {
    setMenu(menuValue.overview)
  }


  return (
    <div className="profileContainer">
      <Header></Header>
      <div className="middle">
        <ProfileNav overview={clickOverview} delete={clickDelete} update={clickUpdate}></ProfileNav>
        {menu === menuValue.overview ? <div className="page">
          <span className="welcomeText">Hi {user.name}</span>
          <span className="mainText">Your email is: {user.email}</span>
        </div> : null}
        {menu === menuValue.update ? <div className="page">
          <span className="updateText">Change your password</span>

          <form className="updateForm" onSubmit={handleUpdate}>
            <div className="input1 input-effect">
              <input name="oldPass" className={oldPass === "" ? "updateForm effect-20" : "updateForm effect-20 has-content"} type="password" placeholder="" onChange={(e) => setOldPass(e.target.value)} required />
              <label>Old password</label>
              <span class="focus-border">
                <i></i>
              </span>

            </div>
            <div className="input1 input-effect">
              <input name="newPass" className={newPass === "" ? "updateForm effect-20" : "updateForm effect-20 has-content"} type="password" placeholder="" onChange={(e) => setNewPass(e.target.value)} required />
              <label>New password</label>
              <span class="focus-border">
                <i></i>
              </span>
            </div>
            <div className={(error || success) ? "input2 input-effect" : "input1 input-effect"}>
              <input name="confNewPass" className={confNewPass === "" ? "updateForm effect-20" : "updateForm effect-20 has-content"} type="password" placeholder="" onChange={(e) => setConfNewPass(e.target.value)} required />
              <label>Confirm new password</label>
              <span class="focus-border">
                <i></i>
              </span>
            </div>
            {error ? <div className="errorMessageUpdate">{errorMessage}</div> : null}
            {success ? <div className="successMessageUpdate">{successMessage}</div> : null}
            <button className="updateButton" type="submit" value="Submit">Submit</button>
          </form>

        </div> : null}
        {menu === menuValue.delete ? <div className="page">
          <span className="deleteMainText">Are you sure you want to delete your account?</span>
          <span className="deleteText">The process is irreversible</span>
          <div className="buttonContainer">
            <form onSubmit={handleDelete}>
              <button className="deleteButton" type="submit" value="Submit">Delete</button>
            </form>
          </div>
        </div> : null}
      </div>
      <Footer></Footer>
    </div>
  );

}
