import React, { Component, useEffect, useState } from 'react';
import { ResidentsListContainer } from './ResidentsListContainer.jsx';
import { ResidentBox } from '../components/ResidentBox.jsx';
import { ResidentDetails } from '../components/ResidentDetails.jsx';

export const UserContainer = (props) => {
  const [user, setUser] = useState({});
  const [userIcon, setUserIcon] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/residents/id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: props.userId
      })
    })
      .then(res => res.json())
      .then(res => {
        setUser(res);
        return res;
      })
      .then(res => setUserIcon({ name: res.name, photo: res.photo }));
  },[]);

  function changeInput(e, key) {
    console.log(key);
    console.log(e.target.value);
    setUser({
      ...user,
      [key]: e.target.value,
    });
  }

  function saveFunction() {
    console.log(user);
  }

  console.log(user);
  return (
    <div className="UserContainer">
      <div className="ResidentsProfile">
        <ResidentBox photo={userIcon.photo} name={userIcon.name}/>
      </div>
      <ResidentDetails user={user} saveFunction={saveFunction} changeInput={changeInput}/>
    </div>
  );
};