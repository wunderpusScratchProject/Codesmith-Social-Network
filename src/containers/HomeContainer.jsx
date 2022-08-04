import React, { Component, useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { NavBar } from './NavBarContainer.jsx';
import { CohortContainer } from './CohortContainer.jsx';
import { OrganizationContainer } from './OrganizationContainer.jsx';
import { SearchContainer } from './SearchContainer.jsx';
import { HomePage } from '../components/HomePage.jsx';
import { ResidentsContainer } from './ResidentsContainer.jsx';
import { UserContainer } from './UserContainer.jsx';

export const HomeContainer = () => {
  const [active, setActive] = useState('Home');
  const [searchValue, setSearchValue] = useState('');
  const [userId, setUserId] = useState(1);
  const isAuthenticated = useStoreState((state) => state.isAuthenticated);
  const changeAuthenticated = useStoreActions(
    (actions) => actions.changeAuthenticated
  );
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
    elem = <div className="DisplayBox"><UserContainer
      changeAuthenticated={changeAuthenticated}
      userId={userId} /></div>;
  }

  return (
    <div className="HomeContainerPage">
      <NavBar active={active} searchValue={searchValue} setSearchValue={setSearchValue} setActive={setActive}/>
      {elem}
    </div>
  );
};