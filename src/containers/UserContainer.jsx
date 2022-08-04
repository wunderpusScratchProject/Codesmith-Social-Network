import React, { Component, useEffect, useState } from 'react';
import { ResidentsListContainer } from './ResidentsListContainer.jsx';
import { ResidentBox } from '../components/ResidentBox.jsx';
import { ResidentDetails } from '../components/ResidentDetails.jsx';
import { NavBar } from './NavBarContainer.jsx';
import { useStoreState, useStoreActions } from 'easy-peasy';


export const UserContainer = (props) => {
  const isAuthenticated = useStoreState((state) => state.isAuthenticated);
  const changeAuthenticated = useStoreActions( (actions) => actions.changeAuthenticated);
  const [user, setUser] = useState({});
  const [userIcon, setUserIcon] = useState({});
  const [saved, changeSaved] = useState(false);

  useEffect(() => {
    console.log('DOCUMENT COOKIE: ', document.cookie.split(';')[0].slice(document.cookie.split(';')[0].indexOf('=') + 1));
    fetch('http://localhost:8080/residents/id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: document.cookie.split(';')[0].slice(document.cookie.split(';')[0].indexOf('=') + 1)
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
      console.log('DOCUMENT COOKIE: ', document.cookie)
      fetch('http://localhost:8080/residents/id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: document.cookie.split(';')[0].slice(document.cookie.split(';')[0].indexOf('=') + 1)
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
    console.log('DOCUMENT COOKIE: ', document.cookie)
    console.log(user);
    fetch('http://localhost:8080/residents/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: document.cookie.split(';')[0].slice(document.cookie.split(';')[0].indexOf('=') + 1),
        user: user,
      })
    })
      .then(changeSaved(true));
  }

  console.log(user);
  return (
    <div className="UserContainer">
      <NavBar/>
      <div className="ResidentsProfile">
        <ResidentBox photo={userIcon.photo} name={userIcon.name}/>
      </div>
      <ResidentDetails user={user} changeAuthenticated={changeAuthenticated} saveFunction={saveFunction} changeInput={changeInput}/>
    </div>
  );
};

