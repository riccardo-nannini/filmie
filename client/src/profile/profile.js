import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../header/header.js';
import Footer from '../footer/footer.js';
import ProfileNav from '../profileSideNav/profileSideNav.js';
import './profile.css';

export default function Profile() {

  const menuValue = {
    update: 1,
    delete: 2,
    overview: 3
  }
  const [user, setUser] = useState({});
  const [menu, setMenu] = useState(menuValue.overview)

  useEffect(() => {
    fetch("/userInfo", {
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        setUser({
          id: data.id,
          name: data.name,
          surname: data.surname,
          email : data.email
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
    <div className="container">
      <Header></Header>
      <div className="middle">
        <ProfileNav overview={clickOverview} delete={clickDelete} update={clickUpdate}></ProfileNav>
        {menu === menuValue.overview ? <div className="page">
          <span className="welcomeText">Hi {user.name}</span>
          <span className="mainText">Your email is: {user.email}</span>
        </div> : null}
        {menu === menuValue.update ? <div className="page">
          <span className="welcomeText">Update</span>
          <span className="mainText">Your email is: {user.email}</span>
        </div> : null}
        {menu === menuValue.delete ? <div className="page">
          <span className="deleteMainText">Are you sure you want to delete your account?</span>
          <span className="deleteText">The process is irreversible</span>
          <div className="buttonContainer">
          <button className="deleteButton" type="submit" value="Submit">Delete</button>
          </div>
        </div> : null}
      </div>
      <Footer></Footer>
    </div>
  );

}
