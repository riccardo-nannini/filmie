import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../header/header.js';
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
      <ProfileNav></ProfileNav>
      <div className="page">Hi {user.name}</div>
    </div>
  );

}
