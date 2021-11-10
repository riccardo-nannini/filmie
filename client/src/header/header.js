import * as React from 'react';
import { Link } from "react-router-dom";
import './header.css'

export default function Header() {

  return (
    <div className="containerHeader">
      <Link className="title" to="/">Filmie</Link>
      <div className="end" href="/profile">
      <a className="endFooter" href="/search">
          Search
        </a>
        <a className="endFooter" href="/profile">
          Profile
        </a>
      </div>
    </div>
  );
}