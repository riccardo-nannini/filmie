import * as React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import tmdb from '../blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
import './footer.css'

export default function Footer(props) {

  const [isFixed, setIsFixed] = useState(props.isFixed);


  
  return (
    <div className={isFixed? "footerFixed" : "footer"}>
      <div className="copyrightFooter"><Link className="footerLink" to="/about">About Filmie</Link></div>
      <a href="mailto:info@filmie.org"className="contact">Contact us</a>
      <a className="powered" href="https://www.themoviedb.org/" target="_blank">Powered by <img src={tmdb}></img></a>
    </div> 

  );
}