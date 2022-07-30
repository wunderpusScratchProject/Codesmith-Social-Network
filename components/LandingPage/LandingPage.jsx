import React, { Component } from 'react';

export const LandingPage = (props) => {

  //Redirect user to LinkedIn OAuth then if successful set authenticated to true
  function logIn() {
    //OAUTH REQUEST BELOW

    props.changeAuthenticated(true);
  }

  return (
    <div className="LandingPage">
      LandingPage
      <button className="LogInButton" onClick={logIn}></button>
    </div>
  );
};