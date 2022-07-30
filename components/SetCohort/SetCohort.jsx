import React, { Component, useState } from 'react';

export const SetCohort = (props) => {
  const [inputValue, changeInput] = useState('');
  
  //Set Cohort and make a PATCH/PUT request to change user's cohort
  function cohortSet() {
    //FETCH REQUEST BELOW

    //Change cohortIsSet to true if successful
    props.setCohort(true);
  }
  
  return (
    <div className="SetCohort">
      SetCohort
      <input type="text" value={inputValue} onChange={(e) => changeInput(e.target.value)}></input>
      <button className="SetCohortButton" onClick={cohortSet}>SetCohort</button>
    </div>
  );
};