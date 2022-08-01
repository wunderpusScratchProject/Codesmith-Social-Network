import React, { Component } from 'react';
import { SearchBar } from '../components/SearchBar.jsx';

export const NavBar = (props) => {

  function clickFunction(focus) {
    props.setActive(focus);
  }

  return (
    <div className="NavBar">
      <div className="NavItems">
        <button className="HomeButton" onClick={() => clickFunction('Home')}>Home</button>
        <SearchBar setActive={props.setActive}/>
      </div>
      <div className="NavItems">
        <button className="OrgButton" onClick={() => clickFunction('Residents')}>Residents</button>
        <button className="OrgButton" onClick={() => clickFunction('Organization')}>Organization</button>
        <button className="CohortButton" onClick={() => clickFunction('Cohort')}>Cohort</button>
        <button className="UserButton" onClick={() => clickFunction('User')}>User</button>
      </div>
    </div>
  );
};