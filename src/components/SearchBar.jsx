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
    <div className="navbar-search">
      <div className="owner-search">
        <input type="text" 
          className="search-input" 
          placeholder="Search by name, cohort, or org..." 
          value={textValue} 
          onKeyDown={enterFunction} 
          onChange={(e) => setTextValue(e.target.value)} />
      </div>
      <div className="search-button">
        <button onClick={clickFunction}>➜</button>
      </div>
    </div>
  );
};