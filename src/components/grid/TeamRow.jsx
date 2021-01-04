import React from 'react';
import ReactDOM from 'react-dom';
import Fixture from './Fixture.jsx';

const TeamRow = (props) => {

  // each time function called, a team object's list of fixtures is passed in through props.fixturesArray
  const render_fixtures = () => {

    let counter = 0;
    let css_class = ''

    let team_fixtures = props.fixturesArray.map((fixture) => {

      if (props.grid_type.general === true) {
        css_class = fixture.gen_css_class;
      }
      // goal potential = opposition defence rating
      else if (props.grid_type.goals === true) {
        css_class = fixture.def_css_class;
      }
      // clean sheet potential = opposition attack rating
      else if (props.grid_type.clean_sheets){
        css_class = fixture.att_css_class;
      }

      // runs a certain number of times set by props.gws_to_display (default is 4)
      if (counter < props.gws_to_display) {
        counter++

        return (
          <Fixture
            key = {fixture.id}
            fixture = {fixture.opp_display}
            css_class = {css_class}
          />
        );
      }
    });

    return team_fixtures;
  }


  return (
    <tr>
      <td className='team-name'>{props.teamName}</td>
      {render_fixtures()}
    </tr>
  );
}

export default TeamRow;
