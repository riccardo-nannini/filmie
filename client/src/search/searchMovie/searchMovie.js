import React from 'react';
import imageNotFound from '../../imageNotFound.svg';
import { useState } from 'react';
import './searchMovie.css';


export default function SearchMovie(props) {

  const [NoImage, setNoImage] = useState(false);

  let movie = props.movie;

  return (
    <div className="searchMovieContainer">
      <a href={"/movie/" + movie.id}>
        {NoImage === false ? 
        <img className="searchMoviePoster" src={movie.poster} onError={()=>{setNoImage(true)}}></img>
          :
        <div className="imageNotFoundContainer">
          <img className="imageNotFound" src={imageNotFound}></img>
        </div>
        }
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
