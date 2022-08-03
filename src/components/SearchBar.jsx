import React, { Component, useState } from 'react';

export const SearchBar = (props) => {
  const [textValue, setTextValue] = useState('');
  //Fetch for search value result
  function clickFunction() {
    changeValues();
  }

  function enterFunction(e) {
    if (e.key === 'Enter') {
      changeValues();
    }
  }

  function changeValues() {
    props.setActive('Search');
    props.setSearchValue(textValue);
    setTextValue('');
  }

  

  return (
    <div className="SearchBarButton">
      <input type="text" className="SearchBar" placeholder="Search by name, cohort, or org..." value={textValue} onKeyDown={enterFunction} onChange={(e) => setTextValue(e.target.value)}></input>
      <button className="SearchButton" onClick={clickFunction}>Search</button>
    </div>
  );
};