import React, { Component, useState } from 'react';
import { ResidentBox } from '../components/ResidentBox';

export const ResidentsListContainer = (props) => {
  const residents = [];

  for (let i = 0; i < props.residentList.length; i++) {
    residents.push(
      <
        ResidentBox 
        key={`residentKey${props.residentList[i].id}`}
        id={`resident${props.residentList[i].id}`} 
        name={props.residentList[i].name} 
        photo={props.residentList[i].photo} 
        organization={props.residentList[i].organization} 
        cohort={props.residentList[i].cohort} 
        linkedin={props.residentList[i].linkedin} 
      />);
  }

  return (
    <div className="ResidentsPage">
    Residents
      <div className="ResidentsByCohort">
        {residents}
      </div>
    </div>
  );
};