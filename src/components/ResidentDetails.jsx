import React, { Component } from 'react';

export const ResidentDetails = (props) => {
  const elems = [];

  for (const key in props) {
    if (props[key] === '') {
      if (key === 'name') {
        elems.push(<input placeholder="Set Name Here" />);
      } else if (key === 'email') {
        elems.push(<input placeholder="Set Email Here" />);
      } else if (key === 'linkedin') {
        elems.push(<input placeholder="Set LinkedIn Link Here" />);
      } else if (key === 'photo') {
        elems.push(<input placeholder="Set Photo Here" />);
      } else if (key === 'organization') {
        elems.push(<input placeholder="Set Organization Here" />);
      } else if (key === 'message') {
        elems.push(<input placeholder="Set Message Here" />);
      }
    } else {
      elems.push(<input placeholder={props[key]} />);
    }
  }

  return (
    <div className="ResidentDetails">
      {elems}
      <button className="SaveButton">Save</button>
    </div>
  );
};