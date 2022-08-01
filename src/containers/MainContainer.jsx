import React, { Component, useState, useEffect } from 'react';
import { HomeContainer } from './HomeContainer.jsx';
import { LandingPage } from '../components/LandingPage.jsx';
import { SetCohort } from '../components/SetCohort.jsx';

export default function MainContainer() {
  const [isAuthenticated, changeAuthenticated] = useState(false);
  const [cohortIsSet, setCohort] = useState(false);

  const getCookie = (cookie) => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(cookie + '='))
      ?.split('=')[1];
  };

  useEffect(() => {
    // On page load, we need to check if linkedInAccessToken and User ID cookies are set
      // if so, we need to redirect to the server to check if the cookie is valid
      // if the cookie is valid, we need to set isAuthenticated to true on the client side
      // if cookie is invalid, clear cookie and redirect back to homepage
    // if cookie is not set, load the landing page
    //Check if cohortIsSet when isAuthenticated is changed to true
    //Fetching to the server, whether user is Authenticated and cohortisset
    
    if (getCookie('userId') && getCookie('linkedInAuthCode')) {
      fetch('http://localhost:8080/verifyuser')
        .then(res => {
          console.log(res);
          if (res) changeAuthenticated(true);
        });
    } else {
      changeAuthenticated(false);
    }

  });

  return (
    <div className="MainContainer">
      { 
        isAuthenticated 
          ? cohortIsSet
            ? <HomeContainer />
            : <SetCohort setCohort={setCohort}/>
          : <LandingPage changeAuthenticated={changeAuthenticated} />
      }
    </div>
  );
}