import React from 'react';
import { useState, useEffect } from 'react';
import Footer from '../footer/footer.js';
import Header from '../header/header.js';
import Carousel from 'react-multi-carousel';
import { Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import 'react-multi-carousel/lib/styles.css';
import './home.css';

export default function Home() {

  const [favoriteMovies, setFavoriteMovies] = useState();
  const [favoriteList, setFavoriteList] = useState();
  const [toWatch, setToWatch] = useState();
  const [watchList, setWatchList] = useState();
  const [showWatchList, setShowWatchList] = useState(false);
  const [showFavoriteList, setShowFavoriteList] = useState(false);
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
    if (favoriteMovies === undefined) return;
    let res = [];
    for (let i = 0; i < favoriteMovies.length; i++) {
      res.push(
        <a href={"/movie/" + favoriteMovies[i].id} style={{ width: '150px', height: '225px', display: 'inline-block' }}>
          <img style={{ width: '150px', borderRadius: '5px' }} src={"https://image.tmdb.org/t/p/w440_and_h660_face" + favoriteMovies[i].poster}></img>
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
          <img style={{ width: '150px', borderRadius: '5px' }} src={"https://image.tmdb.org/t/p/w440_and_h660_face" + toWatch[i].poster}></img>
        </a>
      );
    }
    setWatchList(res);
    setShowWatchList(true);
  }, [toWatch])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
      slidesToSlide: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  
  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <Header></Header>
      <div className="core">
        <form className="searchBarForm">
          <input type="text" placeholder="Search for movies.." name="search" onChange={(e) => setQuery(e.target.value)} />
          <Link  to={"/search/"+query}><button type="submit"><i class="fa fa-search"></i></button></Link>
          
        </form>

        <div className="movieContainer">

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
                transitionDuration={500}
                itemClass="movieImage"
                containerClass="sliderContainer"
                draggable={true}
                swipeable={true}
                infinite={true}
                centerMode={true}
                autoPlay={true}
                autoPlaySpeed={8000}
              >
                {favoriteList === undefined ? <div></div> : favoriteList}
              </Carousel>
            </div>
          </CSSTransition>
        </div>


        <div className="movieContainer">
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
                transitionDuration={500}
                itemClass="movieImage"
                containerClass="sliderContainer"
                draggable={true}
                swipeable={true}
                infinite={true}
                centerMode={true}
                autoPlay={true}
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
