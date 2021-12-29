import React from 'react';
import { useState, useEffect } from 'react';
import Footer from '../footer/footer.js';
import Header from '../header/header.js';
import Carousel from 'react-multi-carousel';
import { CSSTransition } from 'react-transition-group';
import DocumentMeta from 'react-document-meta';
import MovieCard from './movieCard/movieCard.js';
import 'react-multi-carousel/lib/styles.css';
import './home.css';
import { shuffleArray } from '../utils/shuffleArray.js';

export default function Home() {

  const [favoriteMovies, setFavoriteMovies] = useState();
  const [toWatch, setToWatch] = useState();
  const [trendingMovies, setTrendingMovies] = useState();
  const [nowPlaying, setNowPlaying] = useState();
  const [upcoming, setUpcoming] = useState();
  const [favoriteList, setFavoriteList] = useState();
  const [watchList, setWatchList] = useState();
  const [trendingMoviesList, setTrendingMoviesList] = useState();
  const [nowPlayingList, setNowPlayingList] = useState();
  const [upcomingList, setUpcomingList] = useState();
  const [showWatchList, setShowWatchList] = useState(true);
  const [showFavoriteList, setShowFavoriteList] = useState(true);
  const [showTrendingMovies, setShowTrendingMovies] = useState(false);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);

  const meta = {
    title: 'Filmie | Movie Lovers Only',
    description: "Everything you need to know about movies. Keep track of the latest releases and create a list of your favorite contents!",
    canonical: 'https://www.filmie.org',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'movie,cinema,film'
      }
    }
  };

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
    fetch("/getUpcoming", {
      method: "GET"
    }).then(response => response.json())
      .then(data => {
        setUpcoming(data.upcoming)
      });
  }, []);

  useEffect(() => {
    if (favoriteMovies === undefined || favoriteMovies.length === 0) {
      setShowFavoriteList(false)  
      return;
    }
    let res = [];
    for (let i = 0; i < favoriteMovies.length; i++) {
      res.push(
        <MovieCard movie={{id: favoriteMovies[i].id, poster:favoriteMovies[i].poster}}></MovieCard>
      );
    }
    setFavoriteList(res);
    setShowFavoriteList(true);
  }, [favoriteMovies])

  useEffect(() => {
    if (toWatch === undefined || toWatch.length === 0) {
      setShowWatchList(false)  
      return;
    }
    let res = [];
    for (let i = 0; i < toWatch.length; i++) {
      res.push(
        <MovieCard movie={{id: toWatch[i].id, poster:toWatch[i].poster}}></MovieCard>
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
        <MovieCard movie={{id: trendingMovies[i].id, poster:trendingMovies[i].poster}}></MovieCard>
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
        <MovieCard movie={{id: nowPlaying[i].id, poster:nowPlaying[i].poster}}></MovieCard>
      );
    }
    setNowPlayingList(res);
    setShowNowPlaying(true);
  }, [nowPlaying])

  useEffect(() => {
    if (upcoming === undefined) return;
    let res = [];
    shuffleArray(upcoming)
    for (let i = 0; i < upcoming.length; i++) {
      res.push(
        <MovieCard movie={{id: upcoming[i].id, poster:upcoming[i].poster}}></MovieCard>
      );
    }
    setUpcomingList(res);
    setShowUpcoming(true);
  }, [upcoming])

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
      slidesToSlide: 3
    },
    desktop: {
      breakpoint: { max: 2048, min: 1400 },
      items: 8,
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
    <DocumentMeta {...meta}>
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <Header></Header>
      <div className="core">


        <div className={showFavoriteList === false ? "movieContainerNoAuth": "movieContainer"}>
          <div className="slideTitle">Favourite movies</div>
          <CSSTransition
            in={showFavoriteList}
            timeout={300}
            classNames="homeMovieLoad"
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
                autoPlaySpeed={7000}
              >
                {favoriteList === undefined ? <div></div> : favoriteList}
              </Carousel>
            </div>
          </CSSTransition>
        </div>

        <div className={showWatchList === false? "movieContainerNoAuth": "movieContainer"}>
          <div className="slideTitle">Watchlist</div>
          <CSSTransition
            in={showWatchList}
            timeout={300}
            classNames="homeMovieLoad"
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
                autoPlaySpeed={7000}
              >
                {watchList === undefined ? <div></div> : watchList}

              </Carousel>
            </div>
          </CSSTransition>
        </div>

        <div className="movieContainer">
          <div className={nowPlayingList === undefined? "slideTitleNotLoaded" : "slideTitle"}>Now playing in theaters</div>
          <CSSTransition
            in={showNowPlaying}
            timeout={300}
            classNames="homeMovieLoad"
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
                autoPlaySpeed={6000}
              >
                {nowPlayingList === undefined ? <div></div> : nowPlayingList}
              </Carousel>
            </div>
          </CSSTransition>
        </div>

        <div className="movieContainer">
          <div className={trendingMoviesList === undefined? "slideTitleNotLoaded" : "slideTitle"}>Trending movies</div>
          <CSSTransition
            in={showTrendingMovies}
            timeout={300}
            classNames="homeMovieLoad"
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
                autoPlaySpeed={6400}
              >
                {trendingMoviesList === undefined ? <div></div> : trendingMoviesList}
              </Carousel>
            </div>
          </CSSTransition>
        </div>

        <div className="movieContainer">
          <div className={upcomingList === undefined? "slideTitleNotLoaded" : "slideTitle"}>Upcoming movies</div>
          <CSSTransition
            in={showUpcoming}
            timeout={300}
            classNames="homeMovieLoad"
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
                autoPlaySpeed={6800}
              >
                {upcomingList === undefined ? <div></div> : upcomingList}
              </Carousel>
            </div>
          </CSSTransition>
        </div>

      </div>
      <Footer></Footer>
    </div>
    </DocumentMeta>
  );

}
