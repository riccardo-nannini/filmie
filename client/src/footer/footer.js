import * as React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import './footer.css'

export default function Footer(props) {

  const [isFixed, setIsFixed] = useState(props.isFixed);


  
  return (
    <div className={isFixed? "footerFixed" : "footer"}>
      <div className="copyrightFooter">Copyright @<Link className="footerLink" to="/">Filmie</Link> 2021</div>
      <a href="mailto:riccardo.nannini.98@gmail.com"className="contact">Contact us</a>
  
    </div> 

  );
}