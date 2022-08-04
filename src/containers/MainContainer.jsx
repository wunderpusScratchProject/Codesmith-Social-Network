import React, { Component, useState, useEffect } from 'react';
import { HomeContainer } from './HomeContainer.jsx';
import { LandingPage } from '../components/LandingPage.jsx';
import { SetCohort } from '../components/SetCohort.jsx';

export default function MainContainer() {
  const [isAuthenticated, changeAuthenticated] = useState(false);
  const [cohortIsSet, setCohort] = useState(false);
  // const [isComplete, changeComplete] = useState(false);

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
    
    //refactor and check for JWT token. update changeAuth state based on truthy/falsy

    if (getCookie('token')) {
      console.log('found a token, going to verify user');
      fetch('http://localhost:8080/verifyuser', {
        credentials: 'same-origin',
      })
        .then(res => {
          console.log('mainContainer verifyUser: ', res);
          if (res.status === 200) changeAuthenticated(true);
        });
    } else {
      changeAuthenticated(false);
    }
    
    if (getCookie('token')) {
      fetch('http://localhost:8080/verifyuser/complete')
        .then(res => res.json())
        .then(res => {
          console.log('mainContainer complete', res);
          if (res) setCohort(true);
        });
    }
  });

  return (
    <div className="MainContainer">
      {
        isAuthenticated
          ? cohortIsSet
            ? <HomeContainer changeAuthenticated={changeAuthenticated}/>
            : <SetCohort setCohort={setCohort} />
          : <LandingPage changeAuthenticated={changeAuthenticated} />
        //   ? <HomeContainer changeAuthenticated={changeAuthenticated}/>
        //   : <SetCohort setCohort={setCohort}/>
        // : <LandingPage changeAuthenticated={changeAuthenticated} />
      }

      {/* {isComplete && <LandingPage changeComplete={changeComplete} />} */}
    </div>
  );
}