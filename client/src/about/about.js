import * as React from 'react';
import './about.css'
import Header from '../header/header.js';
import DocumentMeta from 'react-document-meta';
import Footer from '../footer/footer';

export default function About() {

  const meta = {
    title: 'Filmie | About',
    description: "Info and credits about the Filmie website",
    canonical: 'https://www.filmie.org',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'movie,cinema,film,credits,about'
      }
    }
  }

  return (
    <DocumentMeta {...meta}>
      <Header></Header>
      <div className="middleContainerAbout">
        <div className="aboutTextContainer">
          <div className="aboutTitle">About Filmie</div>
          <div className="aboutText">Filmie is a non-profit web platform developed with the 
          intent of creating a place where cinephiles can discover new contents and find
          any kind of informations about movies.</div>
          <div className="aboutText2">This product uses the TMDB API but is not endorsed or certified by TMDB.</div>
          <div>Contact info@filmie.org for any issues.</div>

        </div>
      </div>
      <Footer isFixed={true}></Footer>
    </DocumentMeta>
  );
}