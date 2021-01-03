import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header/Header.jsx';
import Key from './components/key.jsx';
import FixtureGrid from './components/grid/FixtureGrid.jsx';

import './App.css';

const App = () => {

    const [teams, setTeams] = useState(null);
    const [gw_object, setGwObject] = useState(null);
    const [grid, setGrid] = useState({
      // default number of gws displayed on grid is 4
      gws_to_display : 4
    });

    // grid teams are by default sorted alphabetically
    const [grid_sorted_by, set_grid_sorted_by] = useState('easiest');
    const [grid_type, set_grid_type] = useState({
      general : true,
      goals : false,
      clean_sheets : false
    });

    // Fetches GET route from the Express server
    const callBackendAPI = async () => {
      const response = await fetch('/express_backend');
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.message)
      }
      return body;
    };

    // Backend API calls pull teams & gw objects & sets to respective states
    React.useEffect(() => {
      callBackendAPI()
        .then((res) => {
          setTeams(res.teams);
          setGwObject(res.gw_object);
        })
        .catch(err => console.log(err));
       // note empty deps array here means useEffect only runs once on render
    }, []);



  // App waits for backend API response to set states of teams & gw objects before rendering App.
    if (teams !== null && gw_object !== null) {

      return (
        <div>
          <Header />
          <Key />
          <FixtureGrid
            gwObject={gw_object}
            grid={grid}
            teams={teams}
            grid_sorted_by={grid_sorted_by}
            grid_type={grid_type}
          />
        </div>
      );
    } else {
      // Loading screen to be rendered here eventually
      return null
    }
  }

export default App;




// import GameweekButtonGroup from './buttongroups/GameweekButtonGroup.jsx';
// import GridTypeButtonGroup from './buttongroups/GridTypeButtonGroup.jsx';
// import RadioButtonGroup from './buttongroups/RadioButtonGroup.jsx';
// import TeamsDropdown from './teamsdropdown/TeamsDropdown.jsx';











//
//   // callback passed into GameweekButtonGroup component, sets number of gws to display
//   const set_gws_to_display = (dataFromChild) => {
//     setGrid(dataFromChild);
//   }
//
//   // callback passed into RadioButtonGroup component, sets order of teams to display (alphabetical, easiest or hardest)
//   const set_grid_sort_order = (dataFromChild) => {
//     set_grid_sorted_by(dataFromChild);
//   }
//
//   const change_grid_type = (dataFromChild) => {
//     set_grid_type(dataFromChild);
//   }
//
//   /* callback passed down into individual TeamsDropdownItem components,
//   sets display property of each nested team object & therefore state of each team in grid */
//   const set_team_display = (teamNameFromChild, booleanFromChild) => {
//     setTeams({
//               ...teams,
//               [teamNameFromChild] : {
//                   ...teams[teamNameFromChild],
//                   display: booleanFromChild
//                 }
//               });
//   }
//


//         <GridTypeButtonGroup
//           firstButton='General'
//           secondButton='Goals potential'
//           thirdButton='Clean sheet potential'
//           callback={change_grid_type}
//         />
//         <GameweekButtonGroup
//           firstButton='4 weeks'
//           secondButton='6 weeks'
//           thirdButton='8 weeks'
//           fourthButton='All'
//           set_gws_to_display={set_gws_to_display}
//           remaining_gws={Object.keys(gw_object).length}
//         />
//         <RadioButtonGroup
//           set_grid_sorted_by={set_grid_sort_order}
//           grid_type={grid_type}
//         />

//         <TeamsDropdown
//           teams={teams}
//           set_team_display={set_team_display}
//         />
