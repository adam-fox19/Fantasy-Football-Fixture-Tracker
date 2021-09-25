// ----------------------------------------------------------
// fixtures-api-data
//
// Converts raw fixtures data from API into custom gw & teams objects
// NB - gw refers to gameweek.
// NB - Api data contains array of individual fixture objects that refer to gameweeks as events.
// ----------------------------------------------------------

// npm packages

// custom modules

// ----------------------------------------------------------
// Returns number of first gw that is yet to start in API array
// Returns index of first occurence of that gw in API array
// ----------------------------------------------------------

const find_starting_gw = (api_array) => {

  let [starting_gw, starting_index, gw_number] = [, , 1];

  try {

    for (let i = 0; i < api_array.length; i++) {

      let fixture = api_array[i];

      // loop reaches new gw in API array
      if (fixture.event !== gw_number && fixture.event !== null) {

        gw_number++;

        // discounts gws that have already started
        if (fixture.finished) {
          continue;
        } else {
          // this fixture & index should be the first gw that is yet to start
          starting_gw = fixture.event;
          starting_index = i;
        }

        return [starting_index, starting_gw];
      }
    }
  }

  catch (err) {
    console.log(err);
  }
}


// ----------------------------------------------------------
// Adds nested object within gw_object representing each unfinished gw
// Called when staging array completed with gw's fixtures
// ----------------------------------------------------------

const add_to_gw_object = (gw_object, staging_array, gw_number) => {
  try {
    gw_object['GW' + gw_number] = {
      id : gw_number,
      display: true,
      double_gw : false,
      double_gw_teams : [],
      blank_gw : false,
      blank_gw_teams : [],
      first_fixture_time : staging_array[0].kickoff_time,
      last_fixture_time: staging_array[staging_array.length - 1].kickoff_time,
      fixtures : []
    };
  }
  catch (err) {
    console.log(err);
  }
}


/*
  API data contains teams identified by a numeric key (1 - 20)
  For some reason this doesn't quite correspond to alphabetical order in the API data
  Leeds and Leicester are the wrong way round in the API data
  api_team_names represents this numeric key structure, and correctly maps across team names for each fixture.
*/

const api_team_names = {
  1: 'Arsenal',
  2: 'Aston Villa',
  3: 'Brentford',
  4: 'Brighton',
  5: 'Burnley',
  6: 'Chelsea',
  7: 'Crystal Palace',
  8: 'Everton',
  9: 'Leicester',
  10: 'Leeds',
  11: 'Liverpool',
  12: 'Manchester City',
  13: 'Manchester United',
  14: 'Newcastle',
  15: 'Norwich',
  16: 'Southampton',
  17: 'Tottenham',
  18: 'Watford',
  19: 'West Ham',
  20: 'Wolves'
}


// ----------------------------------------------------------
// Maps fixtures from each completed staging array's gw into fixtures array of respective nested gw_object
// ----------------------------------------------------------

const map_fixtures_to_gw_object = (staging_array, api_team_names) => {
  try {
    return staging_array.map((fixture) => {
      return {
        home_team : api_team_names[fixture.team_h],
        away_team : api_team_names[fixture.team_a]
      };
    });
  }
  catch (err) {
    console.log(err);
  }
}


// ----------------------------------------------------------
// Checks fixtures array of each nested gw object for teams with either multiple fixtures or no fixtures
// ----------------------------------------------------------

const check_individual_teams = (obj) => {

  let [fixtures_array, unique_teams_array] = [obj.fixtures, []];

  try {
    for (let i = 0; i < fixtures_array.length; i++) {

      if (unique_teams_array.includes(fixtures_array[i].home_team) === false) {
        unique_teams_array.push(fixtures_array[i].home_team);
        } else {
          obj.double_gw = true;
          obj.double_gw_teams.push(fixtures_array[i].home_team)
        }

      if (unique_teams_array.includes(fixtures_array[i].away_team) === false) {
        unique_teams_array.push(fixtures_array[i].away_team);
      } else {
        obj.double_gw = true;
        obj.double_gw_teams.push(fixtures_array[i].away_team)
      }
    }

    // normal gw should always be 20 teams, anything less is a blank gw.
    if (unique_teams_array.length < 20) {

      obj.blank_gw = true;

      const team_names = Object.values(api_team_names);

      for (let i = 0; i < team_names.length; i++) {
        if (unique_teams_array.includes(team_names[i]) === false) {
          // Pushes teams with no fixture to blank_gw_teams
          obj.blank_gw_teams.push(team_names[i]);
        }
      }
    }

  }
  catch (err) {
    console.log(err);
  }
}


// ----------------------------------------------------------
// Converts raw fixtures API data into our custom gw_object
// ----------------------------------------------------------

const convert_fixtures_api_data = (arr) => {

  let [staging_array, gw_object] = [[], {}];

  // sets starting gw & starting index for main loop
  let [starting_index, gw_number] = find_starting_gw(arr);

  for (let i = starting_index; i < arr.length; i++) {

    let fixture = arr[i];

    // loop hasn't reached end of a gw
    if (fixture.event === gw_number) {
      staging_array.push(fixture);
    }
      else
        // loop reaches new gw, staging array complete for current gw
        if (fixture.event !== gw_number && fixture.event !== null) {

          // creates nested object within gw_object for gw in staging array
          add_to_gw_object(gw_object, staging_array, gw_number);

          // fills in fixtures array within nested object just created
          gw_object['GW' + gw_number].fixtures = map_fixtures_to_gw_object(staging_array, api_team_names);

          // checks if gw in staging array is normal, double or blank
          check_individual_teams(gw_object['GW' + gw_number]);

          gw_number++

          // wipes & restarts staging array with new gw
          staging_array = [];
          staging_array.push(fixture);

          continue;
    }

    /*
    last iteration of loop
    needed as fixture.event will equal gw_number at end of the last gw. This is the only time this will happen.
    */
    if (i === arr.length - 1) {

      add_to_gw_object(gw_object, staging_array, gw_number);

      gw_object['GW' + gw_number].fixtures = map_fixtures_to_gw_object(staging_array, api_team_names);

      check_individual_teams(gw_object['GW' + gw_number]);

      break;
    }
  }

  return gw_object;
}


module.exports = convert_fixtures_api_data;





// ----------------------------------------------------------
// End
// ----------------------------------------------------------


/*
  For testing
*/

/*
const testGW =   {
    'GW40' : {
      display: true,
      in_process: false,
      double_gw : false,
      blank_gw : false,
      first_fixture_time : 'time string',
      last_fixture_time: 'time string',
      fixtures : [
        {
          home_team : 1,
          away_team : 2
        },
        {
          home_team : 3,
          away_team : 4
        },
        {
          home_team : 5,
          away_team : 6
        },
        {
          home_team : 7,
          away_team : 8
        },
        {
          home_team : 9,
          away_team : 10
        },
        {
          home_team : 11,
          away_team : 12
        },
        {
          home_team : 13,
          away_team : 14
        },
        {
          home_team : 15,
          away_team : 16
        }
      ]
  }
}

const https = require('https');
require('dotenv').config()

https.get(process.env.FIXTURES_API_PATH, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {

  let raw_fixtures_array = JSON.parse(data);
  let gw_object = convert_API_data(raw_fixtures_array);
  console.log(gw_object);

  })
});

*/
