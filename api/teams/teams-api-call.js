// ----------------------------------------------------------
// teams-api-call
//
// Makes GET request to teams API
// Converts response to JSON of raw teams data
// Draws on convert_teams_api_data to convert JSON into desired object format
// ----------------------------------------------------------

// npm packages
const https = require('https');
require('dotenv').config();


const static_teams_data =  require(__dirname + '/football.js');

// custom modules
const convert_teams_api_data = require(__dirname + '/convert-teams-api-data.js');


const options = {
  headers : {
    'X-RapidAPI-Key' : process.env.TEAMS_API_KEY
  }
};


const teams_api_call = (response, gw_object, callback) => {


  // API data in form of object with nested array of objects, each representing an individual team
  let raw_teams_data = JSON.parse(static_teams_data);

  // converts API data into custom teams object, with nested objects representing each team, their fixtures & associated stats
  let teams = convert_teams_api_data(raw_teams_data, gw_object);

  // currently callback here is our express_backend route GET response
  callback(response, teams);

  // https.get(process.env.TEAMS_API_ENDPOINT, options, (res) => {
  //
  //   let data = '';
  //
  //   res.on('data', (chunk) => {
  //       data += chunk;
  //     });
  //
  //   res.on('end', () => {
  //
  //     // API data in form of object with nested array of objects, each representing an individual team
  //     let raw_teams_data = JSON.parse(data);
  //
  //     // converts API data into custom teams object, with nested objects representing each team, their fixtures & associated stats
  //     let teams = convert_teams_api_data(raw_teams_data, gw_object);
  //
  //     // currently callback here is our express_backend route GET response
  //     callback(response, teams);
  //   });
  // });
}


module.exports = teams_api_call;


// ----------------------------------------------------------
// End
// ----------------------------------------------------------
