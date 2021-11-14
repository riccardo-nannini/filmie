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
import Carousel from 'react-multi-carousel';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
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
  const [ratingDistribution, setRatingDistribution] = useState();
  const [trailer, setTrailer] = useState();
  const [showTrailer, setShowTrailer] = useState(false);
  const [similarMovies, setSimilarMovies] = useState();
  const [similarMoviesList, setSimilarMoviesList] = useState();
  const [showSimilarMovies, setShowSimilarMovies] = useState(false);

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
        setIsRated(data.isRated);
      });
  }, []);

  useEffect(() => {
    const url = "/getVideos/" + id
    fetch(url, {
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        setTrailer(data);
        setShowTrailer(true);
      });
  }, []);

  useEffect(() => {
    const url = "/getSimilar/" + id
    fetch(url, {
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        setSimilarMovies(data);
      });
  }, []);

  useEffect(() => {
    updateRatingDistribution();
  }, []);

  useEffect(() => {
    setRating(0)
    setTimeout(function () { updateRating(); }, 100);
  }, [isRated]);

  useEffect(() => {
    if (similarMovies === undefined) return;
    let res = [];
    for (let i = 0; i < similarMovies.length; i++) {
      res.push(
        <a href={"/movie/" + similarMovies[i].id} style={{ boxShadow: "7px 7px 10px 1px rgba(0, 0, 0, 0.24)", width: '150px', height: '225px', display: 'inline-block' }}>
          <img style={{ width: '150px', borderRadius: '5px' }} src={"https://image.tmdb.org/t/p/w220_and_h330_face/" + similarMovies[i].poster}></img>
        </a>
      );
    }
    setSimilarMoviesList(res);
    setShowSimilarMovies(true);
  }, [similarMovies])

  function updateRatingDistribution() {
    const url = "/getRatingDistribution?movieid=" + encodeURIComponent(id)
    fetch(url, {
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        setRatingDistribution(data.distribution);
      });
  }

  function updateRating() {
    const url = "/rating?movieid=" + encodeURIComponent(id)
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
    setTimeout(function () { updateRating(); updateRatingDistribution(); }, 200);
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
      slidesToSlide: 3
    },
    desktop: {
      breakpoint: { max: 2048, min: 1400 },
      items: 6,
      slidesToSlide: 2
    },
    desktop2: {
      breakpoint: { max: 1400, min: 1210 },
      items: 5,
      slidesToSlide: 2
    },
    desktop3: {
      breakpoint: { max: 1210, min: 1060 },
      items: 4,
      slidesToSlide: 2
    },
    tablet: {
      breakpoint: { max: 1060, min: 900 },
      items: 3,
      slidesToSlide: 2
    },
    tablet2: {
      breakpoint: { max: 900, min: 730 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 730, min: 0 },
      items: 1
    }
  };

  return (
    <div className="movieCont" onClick={() => ReactTooltip.hide()}>
      <Header></Header>
      <div className="moviemiddle" style={movieInfo === undefined ? null : { backgroundImage: `url(${movieInfo.backdrop})` }}>
        <div className="movieOverlay" >
          <CSSTransition
            in={showMovie}
            timeout={300}
            classNames="movieLoad"
          >
            <div className="centered" >
              <div className="poster">
                {movieInfo === undefined ?
                  <div className="noImage">
                  </div>
                  :
                  movieInfo.poster === null ?
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
                    <div data-tip data-for="ratingDist" className="ratingBar">
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
                    <ReactTooltip backgroundColor="" className="ratingChart" place="bottom" type="light" effect="solid" id='ratingDist' event="click hover">
                      <VictoryChart
                        domainPadding={20}
                        padding={25}
                        backgroundComponent={<div className="chartBackground"></div>}
                        title="Test"
                      >
                        <VictoryAxis
                          tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                          tickFormat={["0.5\u2605", "1\u2605", "1.5\u2605", "2\u2605", "2.5\u2605", "3\u2605", "3.5\u2605", "4\u2605", "4.5\u2605", "5\u2605"]}
                        />
                        <VictoryLabel style={{
                          fontSize: 20,
                          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
                        }}
                          text="Rating distribution"
                          x={225}
                          y={30}
                          textAnchor="middle"
                        />
                        <VictoryAxis
                          dependentAxis
                          tickFormat={(y) => (`${y % 1 !== 0 ? "" : Math.floor(y)}`)}
                        />
                        <VictoryBar
                          data={ratingDistribution}
                          x="rating"
                          y="count"
                          barWidth={20}
                          style={{
                            data: {
                              fill: "#511170",
                              fillOpacity: 0.8,
                            }
                          }}
                        />
                      </VictoryChart>
                    </ReactTooltip>
                    <button data-tip data-for="fav" className={isFavorite ? "movieButtonSelected" : "movieButtonNotSelected"} onClick={movieInfo.isAuth ? handleClickFavoriteAuth : handleClickNotAuth}>
                      <img className="movieButtonIcon" src={favorite}></img>
                    </button>
                    <ReactTooltip place="bottom" type="dark" effect="solid" id='fav' >
                      <span>{isFavorite ? "Remove from favorite" : "Add to favorite"}</span>
                    </ReactTooltip>
                    <button data-tip data-for="watch" className={isWatchlist ? "movieButtonSelected" : "movieButtonNotSelected"} onClick={movieInfo.isAuth ? handleClickWatchlist : handleClickNotAuth}>
                      <img className="movieButtonIcon" src={watchlist}></img>
                    </button>
                    <ReactTooltip place="bottom" type="dark" effect="solid" id='watch' >
                      <span>{isWatchlist ? "Remove from watchlist" : "Add to watchlist"}</span>
                    </ReactTooltip>
                    <button data-tip data-for="rate" className={isRated ? "movieButtonSelected" : "movieButtonNotSelected"}>
                      <img src={star}></img>
                    </button>
                    <ReactTooltip className="movieRate" clickable={true} place="bottom" event="click" type="dark" effect="solid" id='rate' >
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
          <div className={showMovie === false? "movieContainerNoAuth" : null}>
          <CSSTransition
            in={showMovie}
            timeout={300}
            classNames="movieLoad"
          >
            <div className="movieSecondRow">
              <div className="movieDetails"></div>
              <div className="movieTrailerContainer">
                <iframe frameborder="0" className="movieTrailer" src={"https://www.youtube-nocookie.com/embed/" + trailer}></iframe>
              </div>
            </div>
          </CSSTransition>
          </div>
          <div className={similarMoviesList === undefined ? "movieContainerNoAuth" : "similarMovieContainer"}>
          <div className="slideTitle">Recommended movies</div>
            <CSSTransition
              in={showSimilarMovies}
              timeout={300}
              classNames="similarMoviesLoad"
            >
              <Carousel
                responsive={responsive}
                autoPlay={false}
                itemClass="movieImage"
                containerClass="sliderContainer"
                draggable={true}
                swipeable={true}
                infinite={true}
                partialVisible={false}
                centerMode={true}
                autoPlay={true}
                showDots={false}
                autoPlaySpeed={7000}
              >
                {similarMoviesList === undefined ? <div></div> : similarMoviesList}
              </Carousel>

            </CSSTransition>
          </div>
        </div>

      </div>
      <Footer></Footer>
    </div >
  );

}
