import React from 'react';
import { useState, useEffect } from 'react';
import Footer from '../footer/footer.js';
import Header from '../header/header.js';
import './home.css';

export default function Home() {

  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <Header></Header>
      <div className="core">
        <form className="searchBarForm" action="">
          <input type="text" placeholder="Search.." name="search"/>
          <button type ="submit"><i class ="fa fa-search"></i></button>
        </form>
        <div className="movieContainer">
          <div className="slideTitle">Favourite movies:</div>
          <div className="content"></div>
        </div>
        <div className="movieContainer">
          <div className="slideTitle">Watchlist:</div>
          <div className="content"></div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );

}
