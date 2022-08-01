import React, { Component, useState } from 'react';
export const SetCohort = (props) => {
  const [cohortValue, changeCohort] = useState('FTRI');
  const [numberValue, changeNumber] = useState(1);
  const [orgValue, changeOrg] = useState();
  const [linkedinUrl, changeUrl] = useState();
  const cohortNums = [];

  //Set Cohort and make a PATCH/PUT request to change user's cohort
  function cohortSet() {
    //FETCH REQUEST BELOW

    console.log(cohortValue + ' ' + numberValue);
    //Change cohortIsSet to true if successful
    props.setCohort(true);
  }

  for (let i = 1; i <= 40; i++) {
    cohortNums.push(<option value={i}>{i}</option>);
  }

  return (
    <div className="SetCohort">
      <img id='codesmithImg' src="https://miro.medium.com/max/1200/1*aqCqaO8ALzYczUHe_3g3Gw.jpeg" alt="Codesmith Logo"></img>
      <div className="SetCohortText"><span className='bigger'>Welcome!</span> <br /> <hr />It seems you're new here. <br /> Please let us know just a little bit more info about you.</div>
      <div className="SetCohortInput">
        {/* <input type="text" value={inputValue} onChange={(e) => changeInput(e.target.value)}></input> */}

        <div className='lineTitle'> Cohort:
          <select name="cohortSelect" id="cohortSelect" value={cohortValue} onChange={(e) => changeCohort(e.target.value)}>
            <option value="FTRI">FTRI</option>
            <option value="PTRI">PTRI</option>
            <option value="LA">LA</option>
            <option value="NY">NY</option>
          </select>
          <select name="cohortNumberSelect" id="cohortNumberSelect" value={numberValue} onChange={(e) => changeNumber(e.target.value)}>
            {cohortNums}
          </select>
          <div className='lineTitle'> Organization:
            <input id="orgSelect" placeholder='Insert organization name...' value={orgValue} onChange={(e) => changeOrg(e.target.value)}></input>
            <div></div>
          </div>
          <div className='lineTitle'> LinkedIn URL:
            <input id="linkedSelect" placeholder='Insert LinkedIn URL...' value={linkedinUrl} onChange={(e) => changeUrl(e.target.value)}></input>
            <div></div>
          </div>
        </div>


        <button className="SetCohortButton" onClick={cohortSet}>Complete Registration</button>
      </div>
    </div>
  );
};