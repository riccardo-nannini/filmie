import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../header/header.js';
import Footer from '../footer/footer.js';
import ProfileNav from '../profileSideNav/profileSideNav.js';
import './profile.css';

export default function Profile() {

  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/userInfo", {
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        setUser({
          id: data.id,
          name: data.name,
          surname: data.surname
        });
      });
  }, []);

  return (
    <div className="container">
      <Header></Header>
      <div className="middle">
        <ProfileNav></ProfileNav>
        <div className="page">
          <span className="mainText">Hi {user.name}</span>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );

}
