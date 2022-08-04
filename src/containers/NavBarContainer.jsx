import React, { Component, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar.jsx';

export const NavBar = (props) => {
  const [refresh, setRefresh] = useState(false);
  const [active, setActive] = useState('home');
  let change = false;
  // useEffect(() => {
  //   console.log('use effect called')
  //   if (refresh) console.log('refreshed');
  // });
  function clickFunction(focus) {
    //props.setActive(focus);
    console.log('button clicked');
    setRefresh(true);
    setActive(focus);
    change = true;
    console.log(refresh);
    //useNavigate(`/${focus}`);
  }
  //if(refresh) useNavigate(`/residents`);
  return (
    <div className="NavBar">
      <div className="NavItems">
        <button className="HomeButton" onClick={() => clickFunction('home')}>Home</button>
        <SearchBar setActive={props.setActive} searchValue={props.searchValue} setSearchValue={props.setSearchValue} />
      </div>
      <div className="NavItems">
        <button className="OrgButton" onClick={() => clickFunction('residents')}>Residents</button>
        <button className="OrgButton" onClick={() => clickFunction('organization')}>Organization</button>
        <button className="CohortButton" onClick={() => clickFunction('cohort')}>Cohort</button>
        <button className="UserButton" onClick={() => clickFunction('user')}>User</button>
      </div>
      {refresh ? <Navigate to={`/${active}`} /> : null}
    </div>
  );
};