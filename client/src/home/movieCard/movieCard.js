import React from 'react';
import { useState } from 'react';
import imageNotFound from '../../imageNotFound.svg';
import './movieCard.css';


export default function MovieCard(props) {

  const [NoImage, setNoImage] = useState(false);
  let movie = props.movie;

  return (
    <a href={"/movie/" + movie.id} className="movieCardContainer">
      {NoImage === false ? 
      <img className="movieCard" src={"https://image.tmdb.org/t/p/w440_and_h660_face" + movie.poster} onLoad={()=>{setNoImage(false)}} onError={()=>{setNoImage(true)}}></img>
        :
      <div className="imageNotFoundHomeContainer">
        <img className="imageNotFoundHome" src={imageNotFound}></img>
      </div>
      }
      </a>);

}
