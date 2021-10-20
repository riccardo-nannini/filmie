import * as React from 'react';
import './profileSideNav.css'

export default function ProfileNav() {

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
        <a href="#">Update profile</a>
        <a href="#">Delete account</a>
        <a onClick={logout}>Logout</a>
      </div>
  );
}