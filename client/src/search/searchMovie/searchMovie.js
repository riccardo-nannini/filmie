import React from 'react';
import imageNotFound from '../../imageNotFound.svg';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import './searchMovie.css';


export default function SearchMovie(props) {

  const [NoImage, setNoImage] = useState(false);
  const history = useHistory();

  let movie = props.movie;

  function movieClick() {
    history.push("/movie/" + movie.id);

  }

  return (
    <div className="searchMovieContainer">
      <div style={{cursor:'pointer'}} onClick={movieClick}>
        {NoImage === false ? 
        <img className="searchMoviePoster" src={movie.poster} onLoad={()=>{setNoImage(false)}} onError={()=>{setNoImage(true)}}></img>
          :
        <div className="imageNotFoundContainer">
          <img className="imageNotFound" src={imageNotFound}></img>
        </div>
        }
      </div>
      <div className="searchDescription">
      <div style={{cursor:'pointer'}} onClick={movieClick}>
          <div className="searchMovieTitle">
            {movie.title}
            <span className="searchMovieYear">{"(" + movie.year + ")"}</span>
          </div>
        </div>
        <span className="searchOverview">
          {movie.overview}
        </span>
      </div>
    </div>
  );

}
