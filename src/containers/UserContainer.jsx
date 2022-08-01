import React, { Component, useEffect, useState } from 'react';
import { ResidentsListContainer } from './ResidentsListContainer.jsx';
import { ResidentBox } from '../components/ResidentBox.jsx';
import { ResidentDetails } from '../components/ResidentDetails.jsx';

export const UserContainer = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/residents/id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: props.userId
      })
    })
      .then(res => res.json())
      .then(res => setUser(res));
  },[]);

  console.log(user);
  return (
    <div className="UserContainer">
      <div className="ResidentsProfile">
        <ResidentBox photo={user.photo} name={user.name}/>
      </div>
      <ResidentDetails name={user.name} email={user.email} linkedin={user.linkedin} message={user.message} organization={user.organization} photo={user.photo} />
    </div>
  );
};