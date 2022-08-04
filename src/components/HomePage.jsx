import React, { Component, useState} from 'react';
import { NavBar } from '../containers/NavBarContainer';
export const HomePage = (props) => {
  
  return (
    <div className="MainContainer">
    <div className="HomeContainerPage">
      <NavBar/>
      <div className="HomePage">
        <span className="bigger">
          Welcome to <br />
          Codesmith Social
        </span>
        <br /> <br />
        Connect with your cohort mates <br /> on the implicit zero!
      </div>
    </div>
    </div>
  );
};