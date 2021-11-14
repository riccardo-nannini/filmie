import React from 'react';
import Header from '../header/header.js';
import Footer from '../footer/footer.js';


export default function Tv(props) {

  const id = props.location.pathname.substring(4)

  return (
    <div className="movieCont">
      <Header></Header>
      <div className="moviemiddle" >
        ID: {id}
      </div>
      <Footer></Footer>
    </div>
  );

}
