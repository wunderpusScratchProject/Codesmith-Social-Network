import React, { Component } from 'react';

const CLIENT_ID = '78jexcndblghpj';
const REDIRECT_URI = 'https%3A%2F%2Flocalhost%3A8080%2Fhome';
const SCOPE = 'r_liteprofile';

export const LandingPage = (props) => {

  //Redirect user to LinkedIn OAuth then if successful set authenticated to true
  function logIn() {
    //OAUTH REQUEST BELOW

    props.changeAuthenticated(true);
  }

  return (
    <div className="LandingPage">
      LandingPage
      <a href={`https://www.linkedin.com/oauth/v2/authorization/?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state="A9Sd.udf8-d1"&scope=${SCOPE}`}>
        <img src="../../server/assets/linkedin-signin-button.png"/>
      </a>
      {/* <button className="LogInButton" onClick={logIn}></button> */}
    </div>
  );
};