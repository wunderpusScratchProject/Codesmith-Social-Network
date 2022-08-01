import React, { Component } from 'react';
import { ResidentBox } from '../components/ResidentBox';

export const ResidentsContainer = (props) => {

  return (
    <div className="ResidentsPage">
      <div className="CohortBlock">
        <div className="CohortSortResident">FTRI 10</div>
        <hr/>
        <div className ="ResidentsByCohort">
          <ResidentBox />
          <ResidentBox />
          <ResidentBox />
          <ResidentBox />
          <ResidentBox />
        </div>
      </div>

      <div className="CohortBlock">
        <div className="CohortSortResident">FTRI 9</div>
        <hr/>
        <div className ="ResidentsByCohort">
          <ResidentBox />
          <ResidentBox />
          <ResidentBox />
          <ResidentBox />
        </div>
      </div>
    </div>
  );
};