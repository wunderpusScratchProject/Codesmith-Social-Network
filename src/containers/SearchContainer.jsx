import React, { Component, useEffect, useState } from 'react';
import { ResidentsListContainer } from './ResidentsListContainer';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { NavBar } from './NavBarContainer';
export const SearchContainer = (props) => {
  //console.log(props.searchValue);
  const searchValue = useStoreState((state) => state.searchValue);
  const [searchResult, setSearchResult] = useState([]);
  const setSearchValue = useStoreActions((actions) => actions.setSearchValue)

  //Fetch request to server, requesting residents with name of props.searchValue
  useEffect(() => {
    fetch('http://localhost:8080/residents/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: searchValue }),
    })
      .then(res => res.json())
      .then(res => setSearchResult(res));
  },[searchValue]);

  return (
    <div>
      <NavBar/>
      <ResidentsListContainer residentList={searchResult}/>
    </div>
  );
};