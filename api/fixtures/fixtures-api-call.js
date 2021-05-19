// ----------------------------------------------------------
// fixtures-api-call
//
// Makes GET request to fixtures API
// Converts response to JSON of raw fixtures data
// ----------------------------------------------------------

// npm packages
const https = require('https');
require('dotenv').config();


const static_fixtures_data = require(__dirname + '/fantasy.js');

// custom modules
const convert_fixtures_api_data = require(__dirname + '/convert-fixtures-api-data.js');


// ----------------------------------------------------------
// pulls raw fixtures data from API, converts to JSON & converts into custom gw_object
// ----------------------------------------------------------

const fixtures_api_call = (callback) => {

  // API data in form of array of objects, each representing an individual fixture
  let raw_fixtures_array = JSON.parse(static_fixtures_data);

  // converts API data into custom gw_object, with nested objects representing each upcoming gameweek
  let gw_object = convert_fixtures_api_data(raw_fixtures_array);

  // Currently callback here is our teams api call & express_backend route GET response
  callback(gw_object);

  // https.get(process.env.FIXTURES_API_PATH, (res) => {
  //
  //   let data = '';
  //
  //   res.on('data', (chunk) => {
  //     data += chunk;
  //   });
  //
  //   res.on('end', () => {
  //     // API data in form of array of objects, each representing an individual fixture
  //     let raw_fixtures_array = JSON.parse(data);
  //
  //     // converts API data into custom gw_object, with nested objects representing each upcoming gameweek
  //     let gw_object = convert_fixtures_api_data(raw_fixtures_array);
  //
  //     // Currently callback here is our teams api call & express_backend route GET response
  //     callback(gw_object);
  //
  //   });
  // });
}

module.exports = fixtures_api_call;


// ----------------------------------------------------------
// End
// ----------------------------------------------------------
