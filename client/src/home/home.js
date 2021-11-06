import React from 'react';
import { useState, useEffect } from 'react';
import Footer from '../footer/footer.js';
import Header from '../header/header.js';
import Carousel from 'react-multi-carousel';
import { Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import 'react-multi-carousel/lib/styles.css';
import './home.css';
import { shuffleArray } from '../utils/shuffleArray.js';

export default function Home() {

  const [favoriteMovies, setFavoriteMovies] = useState();
  const [toWatch, setToWatch] = useState();
  const [trendingMovies, setTrendingMovies] = useState();
  const [nowPlaying, setNowPlaying] = useState();
  const [favoriteList, setFavoriteList] = useState();
  const [watchList, setWatchList] = useState();
  const [trendingMoviesList, setTrendingMoviesList] = useState();
  const [nowPlayingList, setNowPlayingList] = useState();
  const [showWatchList, setShowWatchList] = useState(false);
  const [showFavoriteList, setShowFavoriteList] = useState(false);
  const [showTrendingMovies, setShowTrendingMovies] = useState(false);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [query, setQuery] = useState("");


  useEffect(() => {
    fetch("/favorite", {
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        setFavoriteMovies(data.favorite)
      });
  }, []);

  useEffect(() => {
    fetch("/watchlist", {
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        setToWatch(data.watchlist)
      });
  }, []);

  useEffect(() => {
    fetch("/getTrendingMovies", {
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        setTrendingMovies(data.trending)
      });
  }, []);

  useEffect(() => {
    fetch("/getNowPlaying", {
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        setNowPlaying(data.nowPlaying)
      });
  }, []);

  useEffect(() => {
    if (favoriteMovies === undefined) return;
    let res = [];
    for (let i = 0; i < favoriteMovies.length; i++) {
      res.push(
        <a href={"/movie/" + favoriteMovies[i].id} style={{ width: '150px', height: '225px', display: 'inline-block' }}>
          <img style={{ width: '150px', borderRadius: '5px' }} src={"https://image.tmdb.org/t/p/w220_and_h330_face/" + favoriteMovies[i].poster}></img>
        </a>
      );
    }
    setFavoriteList(res);
    setShowFavoriteList(true);
  }, [favoriteMovies])

  useEffect(() => {
    if (toWatch === undefined) return;
    let res = [];
    for (let i = 0; i < toWatch.length; i++) {
      res.push(
        <a href={"/movie/" + toWatch[i].id} style={{ width: '150px', height: '225px', display: 'inline-block' }}>
          <img style={{ width: '150px', borderRadius: '5px' }} src={"https://image.tmdb.org/t/p/w220_and_h330_face/" + toWatch[i].poster}></img>
        </a>
      );
    }
    setWatchList(res);
    setShowWatchList(true);
  }, [toWatch])

  useEffect(() => {
    if (trendingMovies === undefined) return;
    let res = [];
    shuffleArray(trendingMovies)
    for (let i = 0; i < trendingMovies.length; i++) {
      res.push(
        <a href={"/movie/" + trendingMovies[i].id} style={{ width: '150px', height: '225px', display: 'inline-block' }}>
          <img style={{ width: '150px', borderRadius: '5px' }} src={"https://image.tmdb.org/t/p/w220_and_h330_face/" + trendingMovies[i].poster}></img>
        </a>
      );
    }
    setTrendingMoviesList(res);
    setShowTrendingMovies(true);
  }, [trendingMovies])

  useEffect(() => {
    if (nowPlaying === undefined) return;
    let res = [];
    shuffleArray(nowPlaying)
    for (let i = 0; i < nowPlaying.length; i++) {
      res.push(
        <a href={"/movie/" + nowPlaying[i].id} style={{ width: '150px', height: '225px', display: 'inline-block' }}>
          <img style={{ width: '150px', borderRadius: '5px' }} src={"https://image.tmdb.org/t/p/w220_and_h330_face/" + nowPlaying[i].poster}></img>
        </a>
      );
    }
    setNowPlayingList(res);
    setShowNowPlaying(true);
  }, [nowPlaying])

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
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <Header></Header>
      <div className="core">
        <form className="searchBarForm">
          <input type="text" placeholder="Search for movies.." name="search" onChange={(e) => setQuery(encodeURIComponent(e.target.value))} />
          <Link to={"/search?search=" + query}><button type="submit"><i class="fa fa-search"></i></button></Link>
        </form>

        <div className="movieContainer">
          <div className={nowPlayingList === undefined? "slideTitleNotLoaded" : "slideTitle"}>Now playing in theaters:</div>
          <CSSTransition
            in={showNowPlaying}
            timeout={300}
            classNames="movieLoad"
          >
            <div className="content">
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
                autoPlaySpeed={8000}
              >
                {nowPlayingList === undefined ? <div></div> : nowPlayingList}
              </Carousel>
            </div>
          </CSSTransition>
        </div>

        <div className="movieContainer">
          <div className={trendingMoviesList === undefined? "slideTitleNotLoaded" : "slideTitle"}>Trending movies:</div>
          <CSSTransition
            in={showTrendingMovies}
            timeout={300}
            classNames="movieLoad"
          >
            <div className="content">
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
                autoPlaySpeed={8000}
              >
                {trendingMoviesList === undefined ? <div></div> : trendingMoviesList}
              </Carousel>
            </div>
          </CSSTransition>
        </div>


        <div className={favoriteList === undefined ? "noList" : null}></div>
        <div className={favoriteList === undefined ? "movieContainerNoAuth" : "movieContainer"}>

          <div className="slideTitle">Favourite movies:</div>
          <CSSTransition
            in={showFavoriteList}
            timeout={300}
            classNames="movieLoad"
          >
            <div className="content">
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
                autoPlaySpeed={8000}
              >
                {favoriteList === undefined ? <div></div> : favoriteList}
              </Carousel>
            </div>
          </CSSTransition>
        </div>


        <div className={watchList === undefined ? "noList" : null}></div>
        <div className={watchList === undefined ? "movieContainerNoAuth" : "movieContainer"}>
          <div className="slideTitle">Watchlist:</div>
          <CSSTransition
            in={showWatchList}
            timeout={300}
            classNames="movieLoad"
          >
            <div className="content">
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
                autoPlaySpeed={8000}
              >
                {watchList === undefined ? <div></div> : watchList}

              </Carousel>
            </div>
          </CSSTransition>
        </div>

      </div>
      <Footer></Footer>
    </div>
  );

}
