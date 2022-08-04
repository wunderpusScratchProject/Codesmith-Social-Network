import React, { Component, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Navigate, useNavigate } from 'react-router';
import { LandingPage } from './LandingPage';

export const ResidentDetails = (props) => {
  const isAuthenticated = useStoreState((state) => state.isAuthenticated);
  const changeAuthenticated = useStoreActions(
    (actions) => actions.changeAuthenticated
  );
  const [refresh, setRefresh] = useState(false);
  const elems = [];
  console.log(props.user);
  for (const key in props.user) {
    if (key !== 'id') {
      if (props.user[key] === '') {
        if (key === 'name') {
          elems.push(<input placeholder="Set Name Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'email') {
          elems.push(<input placeholder="Set Email Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'linkedin') {
          elems.push(<input placeholder="Set LinkedIn Profile Link Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'photo') {
          elems.push(<input placeholder="Set Photo Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'organization') {
          elems.push(<input placeholder="Set Organization Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'message') {
          elems.push(<input placeholder="Set Message Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        }
      } else {
        elems.push(<input value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
      }
    }
  }

  const deleteUser = () => {
    const deleteRequest = async (req, res) => {
      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({
          name: props.user.name,
        })
      }
      try {
        const response = await fetch('http://localhost:8080/residents/delete', settings)
        const data = await response.json()
        console.log(`profile succesfully deleted: ${data}`)
      } catch (err) {
        console.log(`Error occured while trying to delete your profile: ${err}`)
      }
    }
    deleteRequest();
    changeAuthenticated(false);
    document.cookie = 'userId=0; path=/; max-age=0;';
    document.cookie = 'linkedInAuthCode=0; path=/; max-age=0;';
  }
  
  return (
    <div className="ResidentDetails">
      {elems}
      <button className="SaveButton" onClick={props.saveFunction}>Save</button>
      <button className="LogOutButton" onClick={() => {
        document.cookie = 'userId=0; path=/; max-age=0;';
        document.cookie = 'linkedInAuthCode=0; path=/; max-age=0;';
        console.log('logged out')
        changeAuthenticated(false);
        setRefresh(true);
      }
      }>Log out</button>
      {refresh ? <Navigate to={'/'} /> : null}
      {!isAuthenticated ? <Navigate to={'/'}/> : null }
      {/* add a delete profile option
      sends a delete request to the server
      removes cookies and auth token
    redirects users to landing page */}
      <button onClick={() => {deleteUser()}  } >Delete Profile</button>
    </div>
  );
};