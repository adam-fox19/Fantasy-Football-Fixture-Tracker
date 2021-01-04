import React from 'react';
import ReactDOM from 'react-dom';


const TeamsDropdownItem = (props) => {

  // sets display property/state of respective team within teams object
  const handle_click = () => {

    if (props.teams[props.teamName].display) {
      props.set_team_display(props.teamName, false);
    } else {
      props.set_team_display(props.teamName, true);
    }
  }

  return (
    <div className='dropdown-item'>
      <input type='checkbox'
            id={props.teamName}
            name={props.teamName}
            checked={props.teams[props.teamName].display}
            onClick={handle_click}
            />
      <label htmlFor={props.teamName}>{props.teamName}</label>
    </div>
  )
}


export default TeamsDropdownItem;
