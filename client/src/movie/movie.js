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
import Provider from './provider/provider.js';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import { CircularProgressbar } from 'react-circular-progressbar';
import MovieCard from '../home/movieCard/movieCard.js';
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
  const [similarMovies, setSimilarMovies] = useState();
  const [similarMoviesList, setSimilarMoviesList] = useState();
  const [showSimilarMovies, setShowSimilarMovies] = useState(false);
  const [providers, setProviders] = useState();
  const [providersList, setProvidersList] = useState();

  const history = useHistory();
  const id = props.location.pathname.substring(7);
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  useEffect(() => {
    const url = "/movie/" + id
    fetch(url, {
      method: "POST"
    }).then(response => response.json())
      .then(data => {
        let releaseDate = new Date(data.year);
        let now = new Date();
        if (releaseDate > now) {
          data.isReleased = false
          data.releaseDate = "" + monthNames[releaseDate.getMonth()] + " " + releaseDate.getDate() +", " + releaseDate.getFullYear();
        } else {
          data.isReleased = true
          data.releaseDate = null
        }
        data.year = data.year.substring(0, data.year.length-6)
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
        console.log(movieInfo)
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
    const url = "/getProviders/" + id
    fetch(url, {
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        setProviders(data);
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
    if (similarMovies.length == 0) return
    let res = [];
    for (let i = 0; i < similarMovies.length; i++) {
      res.push(
        <MovieCard movie={{id: similarMovies[i].id, poster:similarMovies[i].poster}}></MovieCard>
      );
    }
    setSimilarMoviesList(res);
    setShowSimilarMovies(true);
  }, [similarMovies])


  useEffect(() => {
    if (providers === undefined) return;
    let providersBuy = [];

    if (providers.buy.length == 0 && providers.rent.length == 0 && providers.flatrate.length == 0) return;
    for (let i = 0; i < providers.buy.length && i < 9; i++) {
      providersBuy.push(
        <Provider provider={providers.buy[i].logo}></Provider>
      );
    }

    let providersRent = [];
    for (let i = 0; i < providers.rent.length && i < 9; i++) {
      providersRent.push(
        <Provider provider={providers.rent[i].logo}></Provider>
      );
    }

    let providersFlatrate = [];
    for (let i = 0; i < providers.flatrate.length && i < 9; i++) {
      providersFlatrate.push(
        <Provider provider={providers.flatrate[i].logo}></Provider>
      );
    }
    
    setProvidersList({
      providersBuy: providersBuy,
      providersRent: providersRent,
      providersFlatrate: providersFlatrate
    });
  }, [providers])

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
    superLargeDesktop1: {
      breakpoint: { max: 4000, min: 2500 },
      items: 12,
      slidesToSlide: 3
    },
    superLargeDesktop: {
      breakpoint: { max: 2500, min: 2048 },
      items: 10,
      slidesToSlide: 3
    },
    desktop0: {
      breakpoint: { max: 1800, min: 1400 },
      items: 10,
      slidesToSlide: 2
    },
    desktop1: {
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
                  <div className="movieYear">{movieInfo === undefined ? null : movieInfo.isReleased? "(" + movieInfo.year + ")" : null}</div>
                </div>
                {movieInfo === undefined? null : movieInfo.isReleased? null : <div className="movieReleaseDate2">Release date: <span>{movieInfo.releaseDate}</span></div> }
                <div className="genresInfo">
                  {movieInfo === undefined ? null : movieInfo.genres}
                  <span className="movieDuration"> {movieInfo === undefined ? null : movieInfo.duration === 0? null : +movieInfo.duration + " min"} </span>
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
                        value={movieInfo.rate/2}
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
              <div className="movieDetails">
                <div className="providersContainer">
                {providersList === undefined ? null : <div className="streamText">Watch now! <span className="streamText2">Powered by <a target="_blank" href="https://www.justwatch.com/">JustWatch</a></span></div>}
                <div className="providersList">
                {providersList === undefined ? null : providersList.providersBuy.length === 0 ? null : <div className="providersTitle">Buy</div>}
                {providersList === undefined ? null : providersList.providersBuy}
                </div>
                <div className="providersList">
                {providersList === undefined ? null : providersList.providersRent.length === 0? null : <div className="providersTitle">Rent</div>}
                {providersList === undefined ? null : providersList.providersRent}
                </div>
                <div className="providersList">
                {providersList === undefined ? null : providersList.providersFlatrate.length === 0? null : <div className="providersTitle">Stream</div>}
                {providersList === undefined ? null : providersList.providersFlatrate}
                </div>
                </div>
              </div>
              
              <div className="movieTrailerContainer">
              {trailer === undefined ? null : trailer === null? null : <iframe title='video' id={10} allowFullScreen frameborder="0" className="movieTrailer" src={"https://www.youtube-nocookie.com/embed/" + trailer}></iframe>}
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
