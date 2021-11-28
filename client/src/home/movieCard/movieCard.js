import React from 'react';
import './movieCard.css';


export default function MovieCard(props) {

  let movie = props.movie;

  return (
    <a href={"/movie/" + movie.id} className="movieCardContainer">
      <img className="movieCard" src={"https://image.tmdb.org/t/p/w440_and_h660_face" + movie.poster}></img>
    </a>);

}
