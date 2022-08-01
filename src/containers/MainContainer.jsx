import React, { Component, useState, useEffect } from 'react';
import { HomeContainer } from './HomeContainer.jsx';
import { LandingPage } from '../components/LandingPage.jsx';
import { SetCohort } from '../components/SetCohort.jsx';

export default function MainContainer() {
  const [isAuthenticated, changeAuthenticated] = useState(false);
  const [cohortIsSet, setCohort] = useState(false);

  useEffect(() => {
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