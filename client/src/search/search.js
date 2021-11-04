import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../header/header.js';
import Footer from '../footer/footer.js';
import SearchMovie from './searchMovie/searchMovie.js';
import { CSSTransition } from 'react-transition-group';
import './search.css';


export default function Search(props) {

  const [searchInfo, setSearchInfo] = useState();
  const [searchInfoList, setSearchInfoList] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const id = props.location.pathname.substring(8)

  useEffect(() => {
    const url = "/search/" + encodeURIComponent(id)
    fetch(url, {
      method: "POST"
    }).then(response => response.json())
      .then(data => {
        setSearchInfo(data.results);
      });
  }, [])

  useEffect(() => {
    let list = [];
    if (searchInfo === undefined) return;
    for (const movie of searchInfo) {
      list.push(
        <SearchMovie movie={movie}></SearchMovie>
      )
    }
    setSearchInfoList(list);
    setShowSearch(true);
  }, [searchInfo])

  function handleSearch() {
    console.log(query)
  }

  return (
    <div className="movieCont">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <Header></Header>
      <div className="movieOverlay">
        <div className="searchCentered">
        <form className="searchBarMovies" onSubmit={handleSearch}>
          <input type="text" placeholder="Search for movies.." name="search" onChange={(e) => setQuery(encodeURIComponent(e.target.value))} />
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>
        <CSSTransition
            in={showSearch}
            timeout={300}
            classNames="movieLoad"
          >
        <div>
          {searchInfoList === undefined? null : searchInfoList}
        </div>
        </CSSTransition>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );

}
