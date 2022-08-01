import React, { Component } from 'react';

export const LandingPage = (props) => {

  //Redirect user to LinkedIn OAuth then if successful set authenticated to true
  async function logIn() {
    //OAUTH REQUEST BELOW
    //const result = await fetch(To Server) => Server makes a request to LinkedInOAuth
    //Store acces token in server
    
    //result.isInSystem === true => 
    props.changeAuthenticated(true);
  }

  return (
    <div className="LandingPage">
      <img id='codesmithImg' src="https://miro.medium.com/max/1200/1*aqCqaO8ALzYczUHe_3g3Gw.jpeg" alt="Codesmith Logo"></img>
      <span className="LandingText">Welcome to the <br/> Codesmith Resident's & Alumni Portal <br/></span>
      {/* <span className='loginLink'><br/>Login with LinkedIn</span> */}
      <button className="LogInButton" onClick={logIn}></button>
    </div>
  );
};