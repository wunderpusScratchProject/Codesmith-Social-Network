import React, { Component, useState, useEffect } from 'react';
import { HomeContainer } from './HomeContainer.jsx';
import { LandingPage } from '../components/LandingPage.jsx';
import { SetCohort } from '../components/SetCohort.jsx';

export default function MainContainer() {
  const [isAuthenticated, changeAuthenticated] = useState(false);
  const [cohortIsSet, setCohort] = useState(false);

  useEffect(() => {
    // On page load, we need to check if linkedInAccessToken cookie is set
      // if so, we need to redirect to the server to check if the cookie is valid
      // if the cookie is valid, we need to set isAuthenticated to true on the client side
      // if cookie is invalid, clear cookie and redirect back to homepage
    // if cookie is not set, load the landing page
    //Check if cohortIsSet when isAuthenticated is changed to true
    //Fetching to the server, whether user is Authenticated and cohortisset
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