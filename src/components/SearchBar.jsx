import React, { Component, useState } from 'react';

export const SearchBar = (props) => {
  const [textValue, changeText] = useState('');

  //Fetch for search value result
  function clickFunction() {
    props.setActive('Search');
    changeText('');
  }

  return (
    <div className="SearchBarButton">
      <input type="text" className="SearchBar" placeholder="Search by name..." value={textValue} onChange={(e) => changeText(e.target.value)}></input>
      <button className="SearchButton" onClick={clickFunction}>Search</button>
    </div>
  );
};