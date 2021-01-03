import React from 'react';
import ReactDOM from 'react-dom';
import TeamsDropdownItem from './TeamsDropdownItem.jsx';


const TeamsDropdown = (props) => {

  const render_teams = () => {

    // Dropdown list of teams will always be alphabetical
    let arr_of_team_names = Object.keys(props.teams).sort();

    let team_names_to_render = arr_of_team_names.map((team) => {

      // set_team_display is callback from App component passed through to each TeamsDropdownItem
      return (
        <TeamsDropdownItem
          key = {props.teams[team].id}
          teamName = {team}
          set_team_display = {props.set_team_display}
          teams={props.teams}
        />
      )
    })

    return team_names_to_render;
  }

  return (
    <div className='dropright teams-dropdown teams-dropdown-wrapper'>
      <button
        className='btn btn-light dropdown-toggle'
        type='button'
        id='dropdownMenuButton'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'>
        Teams displaying
      </button>
      <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
        {render_teams()}
      </div>
    </div>
  );
}

export default TeamsDropdown;
