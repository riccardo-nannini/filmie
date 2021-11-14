import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../header/header.js';
import Footer from '../footer/footer.js';
import SearchMovie from './searchMovie/searchMovie.js';
import search from '../search.svg'
import { useHistory } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import './search.css';


export default function Search(props) {

  const [searchInfo, setSearchInfo] = useState();
  const [searchInfoList, setSearchInfoList] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const urlQuery = props.location.search;
  const history = useHistory();

  useEffect(() => {
    if (urlQuery === "") return;
    const url = "/search" + urlQuery;
    searchMovie(url);
  }, [])

  function searchMovie(query) {
    fetch(query, {
      method: "POST"
    }).then(response => response.json())
      .then(data => {
        setSearchInfo(data.results);
      });
  }

  useEffect(() => {
    let list = [];
    if (searchInfo === undefined) return;
    for (const movie of searchInfo) {
      list.push(
        <SearchMovie movie={movie}></SearchMovie>
      )
    }
    if (!list.length) {
      setNoResults(true);
    } else {
      setSearchInfoList(list);
      setNoResults(false);
    }
    setShowSearch(true);
  }, [searchInfo])

  function handleSearch(e) {
    e.preventDefault();
    setShowSearch(false);
    history.push("/search?search=" + query);
    searchMovie("/search?search=" + query);
  }

  return (
    <div className="movieCont">
      <Header></Header>
      <div className="movieOverlay">
        <div className="searchCentered">
          <form className="searchBarMovies">
            <input type="text" placeholder="Search for movies.." name="search" onChange={(e) => setQuery(encodeURIComponent(e.target.value))} />
            <button className="searchButton" onClick={handleSearch}><img className="searchImage" src={search} /></button>
          </form>

          <CSSTransition
            in={showSearch}
            timeout={300}
            classNames="movieLoad"
          >
            <div>
              {searchInfoList === undefined ? null : searchInfoList}
              {noResults === false ? null : <div className="noResults">No result found for {decodeURI(urlQuery.substr(8))}</div>}
            </div>
          </CSSTransition>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );

}
