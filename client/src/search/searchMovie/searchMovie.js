import React from 'react';
import { useState, useEffect } from 'react';
import './searchMovie.css';


export default function SearchMovie(props) {

  let movie = props.movie;

  return (
    <div className="searchMovieContainer">
      <a href={"/movie/" + movie.id}>
        <img className="searchMoviePoster" src={movie.poster}></img>
      </a>
      <div className="searchDescription">
        <a href={"/movie/" + movie.id}>
          <div className="searchMovieTitle">
            {movie.title}
            <span className="searchMovieYear">{"(" + movie.year + ")"}</span>
          </div>
        </a>
        <div className="searchOverview">
          {movie.overview}
        </div>
      </div>
    </div>
  );

}
