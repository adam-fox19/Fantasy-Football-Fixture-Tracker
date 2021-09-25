// ----------------------------------------------------------
// convert-teams-api-data
//
// Teams api data is in form of JSON object with nested array of current premier league teams
// Module extracts data from this such as league position, form, home & away statistics
// Module has logic for normal, double and blank gameweeks
// gw_object is passed into module & is used to allocate each team their respective upcoming fixtures
// ----------------------------------------------------------

// custom modules

const teams_fixture_difficulty = require(__dirname + '/teams-fixture-difficulty.js');


// ----------------------------------------------------------
/* Loops through gw_object & teams object, allocates each team their upcoming fixtures & associated css classes
   also assigns each team difficulty of next 4,6,8 & all upcoming fixtures to property in teams object    */
// ----------------------------------------------------------
const allocate_team_fixtures = (gw_object, teams) => {

  try {

    let [team_name, opp_display] = ['',''];
    let [gen_css_class, attack_css_class, defense_css_class] = ['','',''];
    let team_fixtures = [];

    for (let i = 0; i < Object.keys(teams).length; i++) {

        team_name = Object.keys(teams)[i];

        let [arr_of_gws, arr_of_gw_numbers] = [Object.values(gw_object), Object.keys(gw_object)];

         // used to set React keys for fixture grid <td>'s
        let fixture_id = 1;

        // counters are incremented with each fixture's opponent's general, attack & defense difficulty weighting
        let [gen_counter, attack_counter, defense_counter] = [0,0,0];

        /* looks for team_name in fixtures array passed in. Once found allocates opposing team to
        to opponent variable & returns, increments each counter, and assigns gen, att & def classes */
        const normal_gameweek = (arr, opp_display) => {

          opp_display = '';

          for (let i = 0; i < arr.length; i++) {

            let fixture = arr[i];

            if (team_name === fixture.home_team) {

              // opponents are displayed in fixture grid as eg. ARS (H)
              opp_display = teams[fixture.away_team].short_name + ' (H)';

              gen_counter = gen_counter + teams[fixture.away_team].away.difficulty.weighting;
              attack_counter = attack_counter + teams[fixture.away_team].away.attack.weighting;
              defense_counter = defense_counter + teams[fixture.away_team].away.defense.weighting;

              gen_css_class = teams[fixture.away_team].away.difficulty.rating;
              attack_css_class = teams[fixture.away_team].away.attack.rating;
              defense_css_class = teams[fixture.away_team].away.defense.rating;
              break;
            }

            if (team_name === fixture.away_team) {
              opp_display = teams[fixture.home_team].short_name + ' (A)';

              gen_counter = gen_counter + teams[fixture.home_team].home.difficulty.weighting
              attack_counter = attack_counter + teams[fixture.home_team].home.attack.weighting;
              defense_counter = defense_counter + teams[fixture.home_team].home.defense.weighting;

              gen_css_class = teams[fixture.home_team].home.difficulty.rating;
              attack_css_class = teams[fixture.home_team].home.attack.rating;
              defense_css_class = teams[fixture.home_team].home.defense.rating;
              break;
            }
          }

          return opp_display;
        }

        // once opp_display & classes have been assigned, function is called & pushes to team_fixtures array
        const push_team_fixtures = (opp_display) => {

          team_fixtures.push({
            opp_display: opp_display,
            // ID's are set as combination of team name + fixture ID ie CHE1, CHE2 etc
            id : teams[team_name].short_name + fixture_id,
            gen_css_class : gen_css_class,
            att_css_class : attack_css_class,
            def_css_class : defense_css_class
          });
        }

        // loops through each gw in gw_object
        for (let x = 0; x < arr_of_gws.length; x++) {

          // single gameweek - no blanks or doubles
          if (!arr_of_gws[x].blank_gw && !arr_of_gws[x].double_gw) {

            opp_display = normal_gameweek(arr_of_gws[x].fixtures, opp_display);
            push_team_fixtures(opp_display);
            fixture_id++;
          }

          // blank gameweek only - one or more teams have no fixture
          if (arr_of_gws[x].blank_gw && !arr_of_gws[x].double_gw) {

            // teams who do have fixtures processed normally
            if (arr_of_gws[x].blank_gw_teams.includes(team_name) === false) {

              opp_display = normal_gameweek(arr_of_gws[x].fixtures, opp_display);
              push_team_fixtures(opp_display);
              fixture_id++;
            }

            // teams who don't have a fixture in gw
            else {

              // blank space displayed in fixture table (as opposed to usual opponent team name)
              opp_display = ' ';

              // blank gameweeks are given full weighting & blank css class
              [gen_counter, attack_counter, defense_counter] = [gen_counter + 40, gen_counter + 40, gen_counter + 40];
              [gen_css_class, attack_css_class, defense_css_class] = ['blank', 'blank', 'blank'];

              push_team_fixtures(opp_display);
              fixture_id++;
            }
          }

          // double gw - one or more teams has more than one fixture in a gw
          if (arr_of_gws[x].double_gw) {

            opp_display = '';

            let gw_fixtures = arr_of_gws[x].fixtures;

            // handles instances of blank & double gws
            if (arr_of_gws[x].blank_gw_teams.includes(team_name)) {

              // blank space displayed in fixture table (as opposed to usual opponent team name)
              opp_display = ' ';

              // blank gameweeks are given full weighting & blank css class
              [gen_counter, attack_counter, defense_counter] = [gen_counter + 40, gen_counter + 40, gen_counter + 40];
              [gen_css_class, attack_css_class, defense_css_class] = ['blank', 'blank', 'blank'];

              push_team_fixtures(opp_display);
              fixture_id++;
              continue;

            }

            // teams with only one fixture processed normally
            if (arr_of_gws[x].double_gw_teams.includes(team_name) === false) {

              opp_display = normal_gameweek(arr_of_gws[x].fixtures, opp_display);
              push_team_fixtures(opp_display);
              fixture_id++;
            }

            // teams with more than one fixture in gw
            else {

              for (let y = 0; y < gw_fixtures.length; y++) {

                if (team_name === gw_fixtures[y].home_team) {
                  // team's first fixture
                  if (opp_display === '') {
                    opp_display = teams[gw_fixtures[y].away_team].short_name + ' (H)';
                  }
                  else {
                  // team's second fixture
                    opp_display = opp_display + ', ' + teams[gw_fixtures[y].away_team].short_name + ' (H)';
                  }

                  // weightings are quartered in double gw & double class assigned to fixture
                  gen_counter = gen_counter + (teams[gw_fixtures[y].away_team].away.difficulty.weighting / 4);
                  attack_counter = attack_counter + (teams[gw_fixtures[y].away_team].away.attack.weighting / 4);
                  defense_counter = defense_counter + (teams[gw_fixtures[y].away_team].away.defense.weighting / 4);

                  [gen_css_class, attack_css_class, defense_css_class] = ['double', 'double','double'];
                }

                if (team_name === gw_fixtures[y].away_team) {
                  if (opp_display === '') {
                    // team's first fixture
                    opp_display = teams[gw_fixtures[y].home_team].short_name + ' (A)';
                  }
                  else {
                    // team's second fixture
                    opp_display = opp_display + ', ' + teams[gw_fixtures[y].home_team].short_name + ' (A)';
                  }

                  // weightings are quartered in double gw & double class assigned to fixture
                  gen_counter = gen_counter + (teams[gw_fixtures[y].home_team].home.difficulty.weighting / 4);
                  attack_counter = attack_counter + (teams[gw_fixtures[y].home_team].home.attack.weighting / 4);
                  defense_counter = defense_counter + (teams[gw_fixtures[y].home_team].home.defense.weighting / 4);

                  [gen_css_class, attack_css_class, defense_css_class] = ['double', 'double','double'];
                }
            }

            push_team_fixtures(opp_display);

            fixture_id++;

          }
        }

        /* grid displays 4 upcoming fixtures by default, with options to increase this to 6, 8 and all
        when loop reaches each milestone, gen, att & defense diffs are set as their final counter totals */
        switch (x) {
          case 3 :
            teams[team_name].general_diffs.diff_4 = gen_counter;
            teams[team_name].goal_potential_diffs.diff_4 = defense_counter;
            teams[team_name].clean_sheet_potential_diffs.diff_4 = attack_counter;
            break;
          case 5 :
            teams[team_name].general_diffs.diff_6 = gen_counter;
            teams[team_name].goal_potential_diffs.diff_6 = defense_counter;
            teams[team_name].clean_sheet_potential_diffs.diff_6 = attack_counter;
            break;
          case 7 :
            teams[team_name].general_diffs.diff_8 = gen_counter;
            teams[team_name].goal_potential_diffs.diff_8 = defense_counter;
            teams[team_name].clean_sheet_potential_diffs.diff_8 = attack_counter;
            break;
          case arr_of_gws.length - 1 :
            teams[team_name].general_diffs.diff_all = gen_counter;
            teams[team_name].goal_potential_diffs.diff_all = defense_counter;
            teams[team_name].clean_sheet_potential_diffs.diff_all = attack_counter;
        }

      // end of gw loop
      }

        /* once each team's remaining upcoming fixtures have been pushed to team_fixtures,
           this array is assigned to the respective nested team object in our teams object*/
        teams[team_name].fixtures = team_fixtures;
        team_fixtures = [];

    // end of teams loop
    }
  }

  catch (err) {
    console.log(err);
  }
}



const convert_teams_api_data = (raw_teams_data, gw_object) => {

  try {

    const teams = {}

    // JSON has one nested array of all teams & associated stats
    let raw_teams_array = raw_teams_data.api.standings[0];

    let team_id = 1;

    // Extracts & pushes data required into our custom teams object
    for (let i = 0; i < raw_teams_array.length; i++) {

      let team = raw_teams_array[i];

      teams[team.teamName] = {
        id : team_id,
        display: true,
        short_name: team.teamName.slice(0,3).toUpperCase(),
        league_position: team.rank,
        form: team.forme,
        fixtures_played : team.all.matchsPlayed,
        goals_scored : team.all.goalsFor,
        goals_conceded : team.all.goalsAgainst,
        overall_difficulty : '',
        home : {
          fixtures_played : team.home.matchsPlayed,
          wins : team.home.win,
          draws : team.home.draw,
          losses : team.home.lose,
          goals_scored : team.home.goalsFor,
          goals_conceded : team.home.goalsAgainst,
          difficulty : '',
          attack : '',
          defense : ''
        },
        away : {
          fixtures_played : team.away.matchsPlayed,
          wins : team.away.win,
          draws : team.away.draw,
          losses : team.away.lose,
          goals_scored : team.away.goalsFor,
          goals_conceded : team.away.goalsAgainst,
          difficulty : '',
          attack : '',
          defense : ''
        },
        general_diffs : {},
        goal_potential_diffs : {},
        clean_sheet_potential_diffs : {},
        fixtures : []
      }

      // slice above gives required abbreviation (short_name) for 13/20 teams. This switch corrects the remaining 7
      switch (team.teamName) {
        case 'Manchester City': teams[team.teamName].short_name = 'MCI';
          break;
        case 'Manchester United':
          teams[team.teamName].short_name = 'MUN';
          break;
        case 'Aston Villa':
          teams[team.teamName].short_name = 'AVL';
          break;
        case 'West Ham':
          teams[team.teamName].short_name = 'WHU';
          break;
        case 'Brighton':
          teams[team.teamName].short_name = 'BHA';
      }

      team_id++
    }

    // now that each team object in teams object has been created, we call our two callback functions
    teams_fixture_difficulty(teams);

    allocate_team_fixtures(gw_object, teams);

    return teams;

  }

  catch (err) {
    console.log(err);
  }
}


module.exports = convert_teams_api_data;



// ----------------------------------------------------------
// End
// ----------------------------------------------------------
