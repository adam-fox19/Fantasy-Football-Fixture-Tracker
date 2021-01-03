// ----------------------------------------------------------
// teams-fixture-difficulty
//
// Calculates each team's difficulty rating for overall, home and away, attack and defense
// Based on league position, form, deviance from average goals scored/conceded, and home & away win/draw ratios
// Concludes by assigning each team's difficulty to respective properties in teams object
// ----------------------------------------------------------


// ----------------------------------------------------------
// Returns average goals scored/conceded per match and per home game in the league
// ----------------------------------------------------------

const league_avg_goals = (teams_obj) => {

  let [total_goals, total_matches, home_goals, home_conceded] = [0, 0, 0, 0];

  try {
    for (let prop in teams_obj) {
      let team = teams_obj[prop];
      total_goals = total_goals + team.goals_scored;
      total_matches = total_matches + team.fixtures_played;
      home_goals = home_goals + team.home.goals_scored;
      home_conceded = home_conceded + team.home.goals_conceded;
    }

    // totals halved as by counting each team's goals & matches, we are effectively counting each goal & match twice
    const avg_goals_per_match = (total_goals / 2) / (total_matches / 2);

    // here we are only counting the home team's goals, so this total isn't halved
    const home_avg_goals_scored = home_goals / (total_matches / 2);
    const home_avg_goals_conceded = home_conceded / (total_matches / 2);

    return [avg_goals_per_match, home_avg_goals_scored, home_avg_goals_conceded];

  }
  catch (err) {
    console.log(err);
  }
}


// ----------------------------------------------------------
// Returns difficulty weighting out of ten based on a team's current league position
// ----------------------------------------------------------

const league_position_weighting = (team_league_position) => {

  let weighting = '';

  switch (team_league_position) {
    case 1: case 2: weighting = 10; break;
    case 3: case 4: weighting = 9; break;
    case 5: case 6: weighting = 8; break;
    case 7: case 8: weighting = 7; break;
    case 9: case 10: weighting = 6; break;
    case 11: case 12: weighting = 5; break;
    case 13: case 14: weighting = 4; break;
    case 15: case 16: weighting = 3; break;
    case 17: case 18: weighting = 2; break;
    case 19: case 20: weighting = 1; break;
    default: console.log('Error in league position calculation');
  }
  return weighting;
}


// ----------------------------------------------------------
// Returns difficulty weighting out of ten based on a team's form over last (up to) 5 fixtures
// ----------------------------------------------------------

const form_weighting = (team_form) => {

  let weighting = 0;

  try {
    // team_form passed in as string comprised of up to 5 characters of either 'W','D' or 'L'
    for (let i = 0; i < team_form.length; i++) {
      if (team_form[i] === 'W') {
        weighting = weighting + 2;
      }
      if (team_form[i] === 'D') {
        weighting++;
      }
    }

    return weighting;
  }
  catch (err) {
    console.log(err);
  }
}


// ----------------------------------------------------------
/* Returns difficulty weighting out of ten
   based on deviance of a team's average goals scored & conceded per match from the league average */
// ----------------------------------------------------------

const goals_deviance = (league_avg_scored, league_avg_conceded, team_obj) => {

  // both averages are per match here
  const team_avg_scored = team_obj.goals_scored / team_obj.fixtures_played;
  const team_avg_conceded = team_obj.goals_conceded / team_obj.fixtures_played;

  /* deviances multiplied by 10 & rounded down to nearest integer, as resulting integer then
    captures a range used in switch below (each case is effectively 5-5.99 etc) */
  const scored_deviance = Math.floor((team_avg_scored / league_avg_scored) * 10);
  const conceded_deviance = Math.floor((team_avg_conceded / league_avg_conceded) * 10);

  const allocate_weighting = (is_reversed, deviance) => {

    // These are the weightings allocated for scored & conceded deviances
    let arr = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    // a high deviance for goals scored means a heavier weighting, and vice versa for goals conceded
    if (is_reversed) {
      arr.reverse();
    }

    // less than 50% of league avg
    if (deviance < 5) {
      return arr[0];
    } else
      // greater than 150% of league avg
      if (deviance >= 15) {
        return arr[10];
      }
        else {
          switch (deviance) {
            case 5: return arr[1]; break;
            case 6: return arr[2]; break;
            case 7: return arr[3]; break;
            case 8: return arr[4]; break;
            // within 90 % and 110% of league avg
            case 9: case 10: return arr[5]; break;
            case 11: return arr[6]; break;
            case 12: return arr[7]; break;
            case 13: return arr[8]; break;
            case 14: return arr[9]; break;
          }
        }
    }

  try {
    const scored_weighting = allocate_weighting(false, scored_deviance);
    const conceded_weighting = allocate_weighting(true, conceded_deviance);
    return [scored_weighting, conceded_weighting];
  }
  catch (err) {
    console.log(err);
  }
}

// ----------------------------------------------------------
/* Returns difficulty weighting out of ten based on win & draw % of a team's total fixtures.
   Used in isolation for home & away fixtures, not used when calculating overall difficulty */
// ----------------------------------------------------------

const win_draw_ratios = (obj) => {

  try {
    // Integer between 1 and 10
    let win_ratio_weighting = (Math.round((obj.wins / obj.fixtures_played) * 10));

    // Integer between 1 and 10, given weighting of 0.5
    let draw_ratio_weighting = (Math.round((obj.draws / obj.fixtures_played) * 10)) * 0.5;

    return win_ratio_weighting + draw_ratio_weighting;
  }
  catch (err) {
    console.log(err);
  }
}



// ----------------------------------------------------------
/* Allocates a team one of five string fixture ratings, based on their difficulty weighting
   Doesn't take into account home or away form - set_weighting function does this */
// ----------------------------------------------------------

const set_general_weighting = (team, avg_goals_per_match, general_weighting_without_deviance) => {

  // out of 30
  let [scored_deviance, conceded_deviance] = goals_deviance(avg_goals_per_match, avg_goals_per_match, team);
  let general_weighting = general_weighting_without_deviance + scored_deviance + conceded_deviance;
  let general_rating;

  if (general_weighting > 24) { general_rating = 'very-hard' }
  else if (general_weighting > 18) { general_rating = 'hard' }
  else if (general_weighting > 12) { general_rating = 'average' }
  else if (general_weighting > 6) { general_rating = 'easy' }
  else { general_rating = 'very-easy' }

  return {
    weighting : general_weighting,
    rating : general_rating
  }
}


// ----------------------------------------------------------
/* Allocates a team one of five string fixture ratings, based on their difficulty weighting
   Takes into account general weighting without deviance, home & away win ratios, and home and away deviance */
// ----------------------------------------------------------

const set_weighting = (team, avg_goals_per_match, general_weighting_without_deviance) => {

  let [scored_deviance, conceded_deviance] = goals_deviance(avg_goals_per_match, avg_goals_per_match, team);

  let weighting = win_draw_ratios(team) + scored_deviance + conceded_deviance + general_weighting_without_deviance;
  let rating;

  if (weighting > 32) { rating = 'very-hard' }
  else if (weighting > 24) { rating = 'hard' }
  else if (weighting > 16) { rating = 'average' }
  else if (weighting > 8) { rating = 'easy' }
  else { rating = 'very-easy'}

  return {
    weighting: weighting,
    rating: rating
  }
}


// ----------------------------------------------------------
/* Allocates a team one of five string fixture ratings, based on their difficulty weighting
   Used purely for home & away attack & defense difficulty weightings                  */
// ----------------------------------------------------------

const set_attack_defense_weighting = (team, general_weighting_without_deviance, attack_or_defence_deviance,) => {

  // attack & defense deviance forms basis of attack/defense grids, so this weighting is x4 here & others halved.
  let weighting = (win_draw_ratios(team) / 2) + (attack_or_defence_deviance * 4) + (general_weighting_without_deviance / 2);
  let rating;

  if (weighting > 32) { rating = 'very-hard' }
  else if (weighting > 24) { rating = 'hard' }
  else if (weighting > 16) { rating = 'average' }
  else if (weighting > 8) { rating = 'easy' }
  else { rating = 'very-easy'}

  return {
    weighting: weighting,
    rating: rating
  }
}


// ----------------------------------------------------------
// Module parent function - sets each team's overall, home and away difficulty in teams object
// ----------------------------------------------------------

const teams_fixture_difficulty = (teams) => {

  const [avg_goals_per_match, home_avg_scored, home_avg_conceded] = league_avg_goals(teams);
  // avg goals scored by away team is same as home goals conceded
  const away_avg_scored = home_avg_conceded;
  // as above
  const away_avg_conceded = home_avg_scored;

  for (let prop in teams) {

    let team = teams[prop];

    let general_weighting_without_deviance = league_position_weighting(team.league_position) + form_weighting(team.form);

      // set respective difficulties in teams object which will be passed to React App.
    team.overall_difficulty = set_general_weighting(
      team, avg_goals_per_match, general_weighting_without_deviance
    );
    team.home.difficulty = set_weighting(
      team.home, avg_goals_per_match, general_weighting_without_deviance
    );
    team.away.difficulty = set_weighting(
      team.away, avg_goals_per_match, general_weighting_without_deviance
    );

    // assigned outside of set weighting function, as each object assignment below needs a specific deviance
    let [home_goals_scored_deviance, home_goals_conceded_deviance] = goals_deviance(home_avg_scored, home_avg_conceded, team.home);
    let [away_goals_scored_deviance, away_goals_conceded_deviance] = goals_deviance(away_avg_scored, away_avg_conceded, team.away);

    team.home.attack = set_attack_defense_weighting(
      team.home, general_weighting_without_deviance, home_goals_scored_deviance
    );
    team.home.defense = set_attack_defense_weighting(
      team.home, general_weighting_without_deviance, home_goals_conceded_deviance
    );
    team.away.attack = set_attack_defense_weighting(
      team.away, general_weighting_without_deviance, away_goals_scored_deviance
    );
    team.away.defense = set_attack_defense_weighting(
      team.away, general_weighting_without_deviance, away_goals_conceded_deviance
    );
  }
}


module.exports = teams_fixture_difficulty;
