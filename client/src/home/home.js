import React from 'react';
import { useState, useEffect } from 'react';
import Footer from '../footer/footer.js';
import Header from '../header/header.js';
import './home.css';

export default function Home() {

  return (
    <div>
      <Header></Header>
      <div className="core"></div>
      <Footer></Footer>
    </div>
  );

}
