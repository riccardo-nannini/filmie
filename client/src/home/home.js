import React from 'react';
import { useState, useEffect } from 'react';
import Footer from '../footer/footer.js';
import Header from '../header/header.js';
import './home.css';

export default function Home() {

  /*const [user, setUser] = useState({});

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
  }, []);*/

  return (
    <div>
      <Header></Header>
      <div className="core"></div>
      <Footer></Footer>
    </div>
  );

}
