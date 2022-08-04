import React, { Component, useEffect, useState } from 'react';
import { ResidentsListContainer } from './ResidentsListContainer';

export const OrganizationContainer = (props) => {
  const [orgList, setOrgList] = useState([]);
  const [residents, setResList] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/organizations')
      .then(res => res.json())
      .then(res => setOrgList(res));
  }, []);

  function findResidents(org) {
    console.log(org);
    fetch('http://localhost:8080/organizations/residents', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ organization: org})
    })
      .then(res => res.json())
      .then(res => setResList(res))
      .then(setActive(true));
  }

  const orgs = [];
  for (let i = 0; i < orgList.length; i++) {
    if (orgList[i].organization !== 'Student') {
      orgs.push(<li className='orgItem' onClick={() => findResidents(orgList[i].organization)} >{orgList[i].organization}</li>);
    }
  }

  console.log(residents);
  return (
    <div className="CohortPage">
      <div className='cohortTitle'>Search by Organization</div> 
      {
        !active
          ? 
          <div className="Cohortbox">
            {orgs} 
          </div>
          : 
          <div>
            <button className="BackButton" onClick={() => setActive(false)}>Back</button>
            <div className="Cohortbox">
              <ResidentsListContainer residentList={residents} />
            </div>
          </div>
      }
    </div>
  );
};