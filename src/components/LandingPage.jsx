import React, { Component } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
const CLIENT_ID = '78jexcndblghpj';
const REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A8080%2Flogin';
const SCOPE = 'r_liteprofile r_emailaddress';

export const LandingPage = () => {
  const isAuthenticated = useStoreState((state) => state.isAuthenticated);
  const changeAuthenticated = useStoreActions((actions) => actions.changeAuthenticated);
  //Redirect user to LinkedIn OAuth then if successful set authenticated to true
  async function logIn() {
    //OAUTH REQUEST BELOW
    //const result = await fetch(To Server) => Server makes a request to LinkedInOAuth
    //Store acces token in server

    //result.isInSystem === true => 
    changeAuthenticated(true);
  }

  return (
    <div className="LandingPage">
      <img id='codesmithImg' src="https://miro.medium.com/max/1200/1*aqCqaO8ALzYczUHe_3g3Gw.jpeg" alt="Codesmith Logo"></img>
      <span className="LandingText">Welcome to the <br /> Codesmith Resident's & Alumni Portal <br /></span>
      <button className="LogInButton" onClick={() => parent.open(`https://www.linkedin.com/oauth/v2/authorization/?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state="A9Sd.udf8-d1"&scope=${SCOPE}`)}></button>
    </div>
  );
};