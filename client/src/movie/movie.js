import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../header/header.js';
import Footer from '../footer/footer.js';
import { CSSTransition } from 'react-transition-group';
import favorite from '../favorite.svg';
import watchlist from '../watchlist.svg';
import { useHistory } from "react-router-dom";
import './movie.css';


export default function Movie(props) {

  const [movieInfo, setMovieInfo] = useState();
  const [showMovie, setShowMovie] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

  const history = useHistory();
  const id = props.location.pathname.substring(7)

  useEffect(() => {
    const url = "/movie/" + id
    fetch(url, {
      method: "POST"
    }).then(response => response.json())
      .then(data => {
        setMovieInfo(data);
        setIsFavorite(data.isFavorite);
        setIsWatchlist(data.isWatchlist)
        setShowMovie(true);
      });
  }, []);

  function handleClickFavoriteAuth(e) {
    e.preventDefault();

    const formBody = encodeURIComponent("movieid")+'='+encodeURIComponent(id)

    if (isFavorite) {
      fetch("/removeFavorite", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: formBody,
      });
    } else {
      fetch("/favorite", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: formBody,
      });
    }
    setIsFavorite(!isFavorite);
  }

  function handleClickNotAuth(e) {
    history.push("/login", [{referrer:"movie"}])
  }

  function handleClickWatchlist(e) {
    e.preventDefault();
    const formBody = encodeURIComponent("movieid")+'='+encodeURIComponent(id)

    if (isWatchlist) {
      fetch("/removeWatchlist", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: formBody,
      });
    } else {
      fetch("/watchlist", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: formBody,
      });
    }
    setIsWatchlist(!isWatchlist);
  }

  return (
    <div className="movieCont">
      <Header></Header>
      <div className="moviemiddle" style={movieInfo === undefined ? null : { backgroundImage: `url(${movieInfo.backdrop})` }}>
        <div className="movieOverlay">
          <CSSTransition
            in={showMovie}
            timeout={300}
            classNames="movieLoad"
          >
            <div className="centered">
              <div className="poster">
                {movieInfo === undefined ?
                  <div className="noImage">
                  </div>
                  :

                  <img className="moviePoster" src={movieInfo.poster}></img>

                }
              </div>
              <div className="movieContent">
                <div className="movieTitle">
                  {movieInfo === undefined ? null : movieInfo.title}
                  <div className="movieYear">{movieInfo === undefined ? null : "(" + movieInfo.year + ")"}</div>
                </div>
                <div className="genresInfo">
                  {movieInfo === undefined ? null : movieInfo.genres}
                  <span className="movieDuration"> {movieInfo === undefined ? null : +movieInfo.duration + " min"} </span>
                </div>
                {movieInfo === undefined ? null
                  :
                  <div className="movieButtonsContainer">
                    <button className={isFavorite ? "movieButtonSelected" : "movieButtonNotSelected"} onClick={movieInfo.isAuth? handleClickFavoriteAuth : handleClickNotAuth}>
                      <img src={favorite}></img>
                    </button>
                    <button className={isWatchlist ? "movieButtonSelected" : "movieButtonNotSelected"} onClick={movieInfo.isAuth? handleClickWatchlist : handleClickNotAuth}>
                      <img src={watchlist}></img>
                    </button>
                  </div>}
                <div className="movieTagline">
                  {movieInfo === undefined ? null : movieInfo.tagline}
                </div>
                <div className="movieOverview">
                  {movieInfo === undefined ? null : movieInfo.overview}
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );

}
