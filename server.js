// ----------------------------------------------------------
// server.js
//
//
// ----------------------------------------------------------

// npm packages

const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

require('dotenv').config();

// custom modules

const fixtures_api_call = require(__dirname + '/api/fixtures/fixtures-api-call.js');
const teams_api_call = require(__dirname + '/api/teams/teams-api-call.js');

// ----------------------------------------------------------
// Express app set up & API call
// ----------------------------------------------------------

const port = process.env.PORT || 8080;

const app = express();

app.use(favicon(__dirname + '/build/favicon.ico'));

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname, 'build')));

// sets up bodyparser on app
app.use(bodyParser.urlencoded({
  extended : true
}));

// sets up e-mail transporter
const transporter = nodemailer.createTransport({
  service: 'Yahoo',
  secure: true,
  auth: {
    user: process.env.MIDDLEMAILER,
    pass: process.env.PASS
  }
});


// React app calls /express_backend before render
app.get('/express_backend', (req, res) => {

  /* makes call to fixtures API, converts data & creates gw_object.
     Callback function passed in calls teams_api_call */
  fixtures_api_call((gw_object) => {

    /* makes call to teams API, converts data & creates teams object
      callback function passed in sends response to /express_backend & objects passed back to React app */
    teams_api_call(res, gw_object, (res, teams) => {

      res.send({
          'gw_object' : gw_object,
          'teams' : teams
        });
    });
  })
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.post('/', (req, res) => {

  // responses from feedback form stringified & concatenated into e-mail alert below
  const emailstr = JSON.stringify(req.body.emailInput);
  const messageBody = JSON.stringify(req.body.textAreaInput)

  const mailOptions = {
    from: process.env.MIDDLEMAILER,
    to: process.env.ENDMAIL,
    subject: 'Completed user feedback form - FF Fixture tracker',
    text: 'A user feedback form has been completed.\n\nFrom\: ' + emailstr + '\n\nMessage\: ' + messageBody
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.redirect('/');
})


app.listen(port, () => {
  (console.log('server up and running on port' + port))
});
