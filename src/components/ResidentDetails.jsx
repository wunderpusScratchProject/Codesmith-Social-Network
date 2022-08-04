import React, { Component, useState } from 'react';

export const ResidentDetails = (props) => {
  
  const [deleteActive, setDeleteStatus] = useState(false);

  function initialDelete() {
    return (
      <button className="DeleteButton" onClick={() => setDeleteStatus(true)}>Delete Account</button> 
    );
  }
  
  function confirmDelete(props) {
    return (
      <>
        <button className="DeleteButton" onClick={props.deleteFunction}>Please confirm delete account</button>
        <button className="NevermindButton" onClick={() => setDeleteStatus(false)}>Nevermind</button> 
      </>
    );
  }

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
        props.changeAuthenticated(false);
      }
      }>Log out</button>
      { !deleteActive && initialDelete() }
      { deleteActive && confirmDelete(props) }
    </div>
  );
};
