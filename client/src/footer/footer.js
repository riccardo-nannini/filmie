import * as React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import './footer.css'

export default function Footer(props) {

  const [isFixed, setIsFixed] = useState(props.isFixed);


  
  return (
    <div className={isFixed? "footerFixed" : "footer"}>
      <div className="copyrightFooter">Copyright @<Link className="footerLink" to="/">Filmie</Link> 2021</div>
      <a href="mailto:info@filmie.org"className="contact">Contact us</a>
      <a className="powered" href="https://www.themoviedb.org/">Powered by TMDB API</a>
    </div> 

  );
}