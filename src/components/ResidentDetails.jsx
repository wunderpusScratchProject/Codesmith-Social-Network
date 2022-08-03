import React, { Component, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Navigate } from 'react-router';
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
      {refresh? <Navigate to={'/'}/>: null}
    </div>
  );
};