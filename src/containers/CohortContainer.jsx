import React, { Component, useEffect, useState } from 'react';
import { ResidentsListContainer } from './ResidentsListContainer';

export const CohortContainer = (props) => {
  const [cohortList, setCohortList] = useState([]);
  const [active, setActive] = useState(false);
  const [residentList, setResidentList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/cohort')
      .then(res => res.json())
      .then(res => setCohortList(res));
  }, [active]);

  async function findResidents(cohort) {
    console.log(cohort);
    fetch('http://localhost:8080/cohort/residents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cohort: cohort })
    })
      .then(res => res.json())
      .then(res => setResidentList(res))
      .then(setActive(true));
  }

  const cohorts = [];

  for (let i = 0; i < cohortList.length; i++) {
    cohorts.push(<li className='cohortItem' onClick={() => findResidents(cohortList[i].cohort)}>{cohortList[i].cohort}</li>);
  }

  return (
    <div className="CohortPage">
      <div className='cohortTitle'>Search by Cohort</div>
      {
        !active
          ?
          <div className="Cohortbox">
            {cohorts}
          </div>
          :
          <div>
            <button className="BackButton" onClick={() => setActive(false)}>Back</button>
            <div className="Cohortbox">
              <ResidentsListContainer residentList={residentList} />
            </div>
          </div>
      }
    </div>
  );
};