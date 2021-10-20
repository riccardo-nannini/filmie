import * as React from 'react';
import { Link } from "react-router-dom";
import './footer.css'

export default function Footer() {
  
  return (
    <div className="footer">
      <div className="copyrightFooter">Copyright @ <Link to="/">Filmie</Link> 2021</div>
      <a href="mailto:riccardo.nannini.98@gmail.com"className="contact">Contact us</a>
  
    </div> 

  );
}