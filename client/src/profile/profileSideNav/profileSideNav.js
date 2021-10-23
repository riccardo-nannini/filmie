import * as React from 'react';
import './profileSideNav.css'

export default function ProfileNav(props) {

    function logout(e) {
        e.preventDefault();
    
        fetch("/logout", {
          method: "GET",
        }).then(response => {
          if (response.redirected) {
            window.location.href = response.url;
            return;
          }
        });
      }
  
  return (
    <div class="sidenav">
        <a onClick={props.overview}>Overview</a>
        <a onClick={props.update}>Update profile</a>
        <a onClick={props.delete}>Delete account</a>
        <a onClick={logout}>Logout</a>
      </div>
  );
}