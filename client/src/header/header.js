import * as React from 'react';
import { Link } from "react-router-dom";
import search from '../search.svg';
import profile from '../profile.svg';
import './header.css'

export default function Header() {

  return (
    <div className="containerHeader">
      <Link className="title" to="/">Filmie</Link>
      <div className="end" href="/profile">
      <a className="endFooter" href="/search">
          <img src={search}/>
        </a>
        <a className="endFooter" href="/profile">
        <img src={profile}/>
        </a>
      </div>
    </div>
  );
}