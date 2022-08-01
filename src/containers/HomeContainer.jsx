import React, { Component, useEffect, useState } from 'react';
import { NavBar } from './NavBarContainer.jsx';
import { CohortContainer } from './CohortContainer.jsx';
import { OrganizationContainer } from './OrganizationContainer.jsx';
import { SearchContainer } from './SearchContainer.jsx';
import { HomePage } from '../components/HomePage.jsx';
import { ResidentsContainer } from './ResidentsContainer.jsx';
import { UserContainer } from './UserContainer.jsx';

export const HomeContainer = (props) => {
  const [active, setActive] = useState('Home');
  const [searchValue, setSearchValue] = useState('');
  let elem;

  if (active === 'Home') {
    elem = <div className="DisplayBox"><HomePage /></div>;
  } else if (active === 'Organization') {
    elem = <div className="DisplayBox"><OrganizationContainer /></div>;
  } else if (active === 'Cohort') {
    elem = <div className="DisplayBox"><CohortContainer /></div>;
  } else if (active === 'Search') {
    elem = <div className="DisplayBox"><SearchContainer searchValue={searchValue} /></div>;
  } else if (active === 'Residents') {
    elem = <div className="DisplayBox"><ResidentsContainer /></div>;
  } else if (active === 'User') {
    elem = <div className="DisplayBox"><UserContainer /></div>;
  }

  return (
    <div className="HomeContainerPage">
      <NavBar active={active} searchValue={searchValue} setSearchValue={setSearchValue} setActive={setActive}/>
      {elem}
    </div>
  );
};