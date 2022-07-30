import React, { Component, useState, useEffect } from 'react';

export const ResidentList = (props) => {
  const [residentList, updateResidentList] = useState([]);

  //Fetch list of residents from database, updating the state
  useEffect(() => {
    //GET REQUEST to the server
  });

  return (
    <div className="ResidentList">
      <div>
        List of residents
      </div>
    </div>
  );
};