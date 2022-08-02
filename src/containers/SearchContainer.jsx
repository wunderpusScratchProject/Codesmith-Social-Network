import React, { Component, useEffect, useState } from 'react';
import { ResidentsListContainer } from './ResidentsListContainer';

export const SearchContainer = (props) => {
  console.log(props.searchValue);
  const [searchResult, setSearchResult] = useState([]);

  //Fetch request to server, requesting residents with name of props.searchValue
  useEffect(() => {
    fetch('http://localhost:8080/residents/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: props.searchValue }),
    })
      .then(res => res.json())
      .then(res => setSearchResult(res));
  }, [props.searchValue]);

  return (
    <ResidentsListContainer residentList={searchResult}/>
  );
};