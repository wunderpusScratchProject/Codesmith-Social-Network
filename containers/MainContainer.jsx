import React, { Component, useState, useEffect } from 'react';
import { HomeContainer } from './HomeContainer.jsx';
import { LandingPage } from '../components/LandingPage/LandingPage.jsx';
import { SetCohort } from '../components/SetCohort/SetCohort.jsx'

export default function MainContainer() {
  const [isAuthenticated, changeAuthenticated] = useState(false);
  const [cohortIsSet, setCohort] = useState(false);

  useEffect(() => {
    //Check if cohortIsSet when isAuthenticated is changed to true
    if (isAuthenticated) {
      //Somehow compute whether the user has cohort set or not. if Cohort is set for the user.
      //If user cohort is set in the database, call setCohort(true) 
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