import React, { Component, useEffect, useState } from 'react';
import { ResidentsListContainer } from './ResidentsListContainer.jsx';
import { ResidentBox } from '../components/ResidentBox.jsx';
import { ResidentDetails } from '../components/ResidentDetails.jsx';

export const UserContainer = (props) => {
  const [user, setUser] = useState({});
  const [userIcon, setUserIcon] = useState({});
  const [saved, changeSaved] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/residents/id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: document.cookie.split('; userId=')[1]
      })
    })
      .then(res => res.json())
      .then(res => {
        setUser(res);
        return res;
      })
      .then(res => setUserIcon({ name: res.name, photo: res.photo }));
  },[saved]);

  useEffect(() => {
    if (saved) {
      fetch('http://localhost:8080/residents/id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: document.cookie.split('; userId=')[1]
        })
      })
        .then(res => res.json())
        .then(res => {
          setUser(res);
          return res;
        })
        .then(res => setUserIcon({ name: res.name, photo: res.photo }))
        .then(changeSaved(false));
    }


  }, [saved]);

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
    fetch('http://localhost:8080/residents/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: document.cookie.split('; userId=')[1],
        user: user,
      })
    })
      .then(changeSaved(true));
  }

  function deleteFunction() {
    console.log(user);
    fetch('http://localhost:8080/residents/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: document.cookie.split('; userId=')[1],
      })
    })
      .then(console.log('account deleted'))
      .then(
        document.cookie = 'userId=0; path=/; max-age=0;',
        document.cookie = 'linkedInAuthCode=0; path=/; max-age=0;',
        props.changeAuthenticated(false),
      );
  }

  return (
    <div className="UserContainer">
      <div className="ResidentsProfile">
        <ResidentBox photo={userIcon.photo} name={userIcon.name}/>
      </div>
      <ResidentDetails 
        user={user} 
        changeAuthenticated={props.changeAuthenticated} 
        saveFunction={saveFunction} 
        changeInput={changeInput} 
        deleteFunction={deleteFunction}
        />
    </div>
  );
};