import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../header/header.js';
import Footer from '../footer/footer.js';
import { CSSTransition } from 'react-transition-group';
import favorite from '../favorite.svg';
import watchlist from '../watchlist.svg';
import star from '../star.svg';
import imageNotFound from '../imageNotFound.svg';
import ReactStars from "react-rating-stars-component";
import { useHistory } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './movie.css';


export default function Movie(props) {

  const [movieInfo, setMovieInfo] = useState();
  const [showMovie, setShowMovie] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [rating, setRating] = useState(0);

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
        setIsRated(data.isRated);
        setRating(0)
        setShowMovie(true);
      });
  }, []);

  useEffect(() => {
    updateRating()
  }, [isRated]);

  function updateRating(){
    const url = "/rating?movieid="+encodeURIComponent(id)
    fetch(url, {
      method: "GET",
    }).then(response => response.json())
      .then(data => {
        setRating(data.rating)
      });
  }

  function handleClickFavoriteAuth(e) {
    e.preventDefault();

    const formBody = encodeURIComponent("movieid") + '=' + encodeURIComponent(id)

    if (isFavorite) {
      fetch("/removeFavorite", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      });
    } else {
      fetch("/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      });
    }
    setIsFavorite(!isFavorite);
  }

  function handleClickNotAuth(e) {
    history.push("/login", [{ referrer: "movie" }])
  }

  function handleClickWatchlist(e) {
    e.preventDefault();
    const formBody = encodeURIComponent("movieid") + '=' + encodeURIComponent(id)

    if (isWatchlist) {
      fetch("/removeWatchlist", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      });
    } else {
      fetch("/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      });
    }
    setIsWatchlist(!isWatchlist);
  }

  function addRating(e) {

    const formBody = encodeURIComponent("movieid") + '=' + encodeURIComponent(id) + '&'
      + encodeURIComponent("rating") + '=' + encodeURIComponent(e * 2)

    fetch("/rating", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody,
    });

    setIsRated(true);
    updateRating();
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
                  movieInfo.poster === null? 
                  <div className="brokenImageContainer">
                    <img className="brokenImage" src={imageNotFound}></img>

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
                    <div className="ratingBar">
                      <CircularProgressbar styles={{
                        path: {
                          stroke: `${rating < 33 ? '#eb1313' : rating < 66 ? '#fcd703' : '#3cab5d'}`,
                          strokeLinecap: 'butt',
                          transition: 'stroke-dashoffset 2.5s ease 0s',
                          transformOrigin: 'center center',
                        },
                        trail: {
                          stroke: 'white',
                          strokeLinecap: 'butt',
                          transform: 'rotate(0.25turn)',
                          transformOrigin: 'center center',
                        },
                        text: {
                          fill: 'white',
                          fontSize: '34px',
                        },
                      }} strokeWidth={9} text={rating === 0 ? "NA" : rating + "%"} value={rating} />
                    </div>
                    <button data-tip data-for="fav" className={isFavorite ? "movieButtonSelected" : "movieButtonNotSelected"} onClick={movieInfo.isAuth ? handleClickFavoriteAuth : handleClickNotAuth}>
                      <img src={favorite}></img>
                    </button>
                    <ReactTooltip place="bottom" type="dark" effect="solid" id='fav' >
                      <span>{isFavorite ? "Remove from favorite" : "Add to favorite"}</span>
                    </ReactTooltip>
                    <button data-tip data-for="watch" className={isWatchlist ? "movieButtonSelected" : "movieButtonNotSelected"} onClick={movieInfo.isAuth ? handleClickWatchlist : handleClickNotAuth}>
                      <img src={watchlist}></img>
                    </button>
                    <ReactTooltip place="bottom" type="dark" effect="solid" id='watch' >
                      <span>{isWatchlist ? "Remove from watchlist" : "Add to watchlist"}</span>
                    </ReactTooltip>
                    <button data-tip data-for="rate" className={isRated ? "movieButtonSelected" : "movieButtonNotSelected"}>
                      <img src={star}></img>
                    </button>
                    <ReactTooltip clickable={true} place="bottom" event="click" type="dark" effect="solid" id='rate' >
                      <ReactStars
                        count={5}
                        isHalf={true}
                        onChange={movieInfo.isAuth ? addRating : handleClickNotAuth}
                        size={24}
                        activeColor="#ffd700"
                      />
                    </ReactTooltip>
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
