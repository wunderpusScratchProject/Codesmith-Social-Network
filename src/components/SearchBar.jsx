import React, { Component, useState, useEffect } from 'react';
import { useStoreState,useStoreActions } from 'easy-peasy';
import { Navigate, useNavigate } from 'react-router';
export const SearchBar = (props) => {
  const [textValue, setTextValue] = useState('');
  const [toSearch, setToSearch] = useState(false);
  //easy peasy state things
  const searchValue = useStoreState((state) => state.searchValue);
  const setSearchValue = useStoreActions((actions) =>  actions.setSearchValue);
  //end of easy peasy state things
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
    //props.setActive('Search'); // reroutes the page to search as current constructed
    setSearchValue(textValue);
    setTextValue('');
    setToSearch(true);
  }

  useEffect(()=> { //this is being used on repeat.. but why??? 
    setToSearch(false);
    console.log('this is toSearch value:',toSearch)
  });
  // if(toSearch) useNavi
  return (
    <div className="SearchBarButton">
      {toSearch ? <Navigate  to={'/search'}/> : null}
      <input type="text" className="SearchBar"
        placeholder="Search by name, cohort, or org..."
        value={textValue} onKeyDown={enterFunction}
        onChange={(e) => setTextValue(e.target.value)}></input>
      <button className="SearchButton" onClick={clickFunction}>Search</button>
    </div>
  );
};