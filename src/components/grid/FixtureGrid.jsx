import React from 'react';
import ReactDOM from 'react-dom';
import TeamRow from './TeamRow.jsx';
import GwHeading from './GwHeading.jsx';


const FixtureGrid = (props) => {

  const render_gw_column_headings = () => {

    let counter = 0;

    /* gwObject's keys represent upcoming gameweeks
       maps through these upcoming gameweeks *gws_to_display* times and returns GwHeading components */
    let gw_headings_to_render = Object.keys(props.gwObject).map((gw) => {
      if (counter < props.grid.gws_to_display) {
        counter++;

        return (
          <GwHeading
            gw = {gw}
            key = {props.gwObject[gw].id}
          />
        )
      }
    })

    return gw_headings_to_render;
  }


  // callback passed into render_team_rows
  const sort_by_easiest = () => {

    let [weighting, object_prop, arr_of_fixture_diffs] = ['', '', []];

    // state of grid_type sets object_prop, to tap into correct property in teams object
    if (props.grid_type.general === true) {
      object_prop = 'general_diffs';
    }
    else if (props.grid_type.goals === true) {
      object_prop = 'goal_potential_diffs'
    }
    else if (props.grid_type.clean_sheets === true) {
      object_prop = 'clean_sheet_potential_diffs'
    }

    /* assigns each team's respective difficulty score to weighting,
    based on the number of weeks provided by gws_to_display */
    for (let prop in props.teams) {
      switch (props.grid.gws_to_display) {
        case 4 : weighting = props.teams[prop][object_prop].diff_4; break;
        case 6 : weighting = props.teams[prop][object_prop].diff_6; break;
        case 8 : weighting = props.teams[prop][object_prop].diff_8; break;
        default : weighting = props.teams[prop][object_prop].diff_all;
      }
      // becomes array containing nested arrays of each team's diff score & team name
      arr_of_fixture_diffs.push([weighting, prop])
    }

    // sorts array in order of lowest diff score
    arr_of_fixture_diffs.sort((a,b) => {
      return a[0] - b[0]
    })

    // removes diff scores from array, leaving just team names in sorted order
    for (let y = 0; y < arr_of_fixture_diffs.length; y++) {
      arr_of_fixture_diffs[y].shift();
    }

    return arr_of_fixture_diffs;
}

  // renders a TeamRow component for each team in teams object, and passes fixtures to component
  const render_team_rows = () => {

    // sorts alphabetically - also triggered by alphabetical radio button checked
    let arr = Object.keys(props.teams).sort();

    // default on load
    if (props.grid_sorted_by === 'easiest') {
      arr = sort_by_easiest();
    }

    if (props.grid_sorted_by === 'hardest') {
      arr = sort_by_easiest();
      arr.reverse();
    }

    // no if statement needed for alphabetically - arr is already sorted as of line 78

    let team_rows_to_render = arr.map((team) => {

      // team display properties can be toggled in teams dropdown
      if (props.teams[team].display) {
        return (
          <TeamRow
            key = {props.teams[team].id}
            teamName = {team}
            fixturesArray = {props.teams[team].fixtures}
            gws_to_display = {props.grid.gws_to_display}
            grid_type = {props.grid_type}
          />
        )
      }
    })
    return team_rows_to_render;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th></th>
            {render_gw_column_headings()}
          </tr>
        </thead>
        <tbody>
        {render_team_rows()}
        </tbody>
      </table>
    </div>
  );
}

export default FixtureGrid;
