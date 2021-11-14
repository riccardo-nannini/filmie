import React from 'react';
import './provider.css';


export default function Provider(props) {

  let provider = props.provider;

  return (
      <img className="providerLogo" src={"https://image.tmdb.org/t/p/original/"+provider}/>
  );

}
