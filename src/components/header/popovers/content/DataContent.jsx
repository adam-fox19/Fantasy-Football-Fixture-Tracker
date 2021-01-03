import React from 'react';
import ReactDOM from 'react-dom';

const DataContent = () => {

  return (
    <div className='data-content-wrapper'>
      <h2>Data</h2>
      <hr />
      <p>
        The tracker is underpinned by data from a <a
          href='https://www.api-football.com/'
          target='_blank'
          rel='noopener noreferrer'
          >sports API </a>
       (recent results, league standings), and from the <a
         href='https://fantasy.premierleague.com/'
         target='_blank'
         rel='noopener noreferrer'
         >Official Premier League Fantasy Football</a> API (gameweek structure, fixture cancellations). This data is refreshed every time
        the tracker is loaded, so up to date information is always displayed.
      </p>
      <div className='data-popover-image-wrapper'>
        <div className='indiv-image-wrapper wrapper-left'>
          <img
               src='api-football.png'
               alt='Homepage of the api-football API'>
          </img>
        </div>
        <div className='indiv-image-wrapper'>
          <img
               src='fplgraphic.png'
               alt='Graphic of Fantasy Football Game & Premier League logo'>
          </img>
        </div>
      </div>
      <hr />
      <h3>Fixture ratings</h3>
      <p>
        As you’ll see from the tracker, each team is assigned a difficulty rating both home and
        away on a five point scale of easiest to hardest. If a particular team is
        proving exceptionally difficult to beat at home, that team’s (H) fixture
        will fall in the hardest category.
      </p>
      <p>
        For every team, each of the variables below are given a weighting,
        with a high weighting implying a strong team. All the weightings are then combined.
        A team (and corresponding fixture, ie Arsenal (A)) who’s overall weighting is
        within 80-100% of the total available weighting is allocated a very hard fixture
        difficulty, and team’s who fall within 60-80% are allocated a hard difficulty, and so on.
      </p>
      <h3 className='variables-h3'>Variables</h3>
      <div className='variables-wrapper'>
        <ol>
          <li>Current <strong>league position</strong></li>
          <li><strong>Form</strong> from last five games (wins, draws, losses)</li>
          <li>Number of <strong>goals scored</strong> compared to league average goals scored (home and away)</li>
          <li>Number of <strong>goals conceded</strong> compared to league average goals scored (home and away)</li>
          <li><strong>Win percentage</strong> over entire season (home and away)</li>
        </ol>
      </div>
      <h3>Grid types</h3>
      <p>
        The weighting size for each variable varies depending on the type of tracker being displayed.
      </p>
      <p>
        For instance, when the <strong>Goals Potential</strong> tracker is being displayed, variable 4 (goals conceded)
        is given a much heavier weighting and the other variable weightings are reduced,
        as goals conceded is the principal factor behind each team’s defensive qualities.
      </p>
      <p>
        On the other hand, variable 3 (goals scored) has a much heavier weighting when the <strong>Clean Sheet Potential</strong> tracker is displayed, as attacking qualities are the most
        important factor here. For the <strong>General</strong> tracker, each variable weighting
        is even to give a holistic view of a fixture’s difficulty.
      </p>
      <hr />
      <h3>Sorting</h3>
      <p>
        Once all these calculations are done, the grid is loaded and sorted.
        The team with the easiest upcoming fixtures - i.e the team who is facing
        opponents with the lowest combined overall weightings, is displayed at the
        top of the grid (assuming the grid is set to sort by easiest)!
      </p>
    </div>
  );
}

export default DataContent;
