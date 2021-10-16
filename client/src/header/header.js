import * as React from 'react';
import { Link } from "react-router-dom";
import './header.css'

export default function Header() {
  
  return (
    <div className="containerHeader">
        <Link className="title" to="/">Filmie</Link>
        <a className="end" href="/profile">
            Profile
        </a>
    </div>
  );
}