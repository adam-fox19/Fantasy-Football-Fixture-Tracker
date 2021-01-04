import React from 'react';
import ReactDOM from 'react-dom';

const TableTypeContent = (props) => {

  return (
    <div className='carousel-wrapper'>
    <h2>Tracker Types</h2>
    <hr />
      <div id={'carousel' + props.screen} className='carousel slide' data-ride='carousel'>
        <ol className='carousel-indicators'>
          <li data-target={'#carousel' + props.screen}  data-slide-to='0' className='active'></li>
          <li data-target={'#carousel' + props.screen}  data-slide-to='1'></li>
          <li data-target={'#carousel' + props.screen}  data-slide-to='2'></li>
        </ol>
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <p className='table-type-question'>Which teams have the easiest overall fixtures coming up?</p>
              <h3>General</h3>
            <p>
              This tracker type shows fixtures based on overall difficulty, taking into account
              offensive & defensive qualities of the opposition. When sorted by easiest the teams
              who have upcoming fixtures that give them the best chance of scoring both
              attacking & defensive Fantasy Football points will be at the top.
            </p>
            <div className='row'>
              <a className='carousel-control-prev' href={'#carousel' + props.screen} role='button' data-slide='prev'>
                <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                <span className='sr-only'>Previous</span>
              </a>
              <div className='btn-group popover-form-dummy-buttons dummy-buttons-table-type-popover'>
                  <label className='btn btn-secondary active'>
                    General
                  </label>
                  <label className='btn btn-secondary'>
                    Goals Potential
                  </label>
                  <label className='btn btn-secondary'>
                    Clean Sheet Potential
                  </label>
              </div>
              <a className='carousel-control-next' href={'#carousel' + props.screen} role='button' data-slide='next'>
                <span className='carousel-control-next-icon' aria-hidden='true'></span>
                <span className='sr-only'>Next</span>
              </a>
            </div>
            <p className='bottom-carousel-p'>
              This tracker type is best used when thinking about attacking defenders,
              as these are the Fantasy Football assets who can benefit most from both weak
              defences (attacking returns) & weak attacks (clean sheet points).
              Midfielders are also worth considering as they can benefit from 1
              additional clean sheet point.
            </p>
          </div>
          <div className='carousel-item'>
            <p className='table-type-question'>Who has the leakiest defences? Which teams ship a load of goals away from home? </p>
            <h3>Goals potential</h3>
            <p>
              This tracker rates fixtures based purely on the opposition’s defensive capabilities.
              When sorted by easiest teams who are facing opponents with weak defences
              will be sorted towards the top. If a particular fixture ie Brighton (H) is rated easy
              on this type of tracker, this is indicative of Brighton conceding frequently
              when playing away.
            </p>
            <div className='row'>
              <a className='carousel-control-prev' href={'#carousel' + props.screen} role='button' data-slide='prev'>
                <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                <span className='sr-only'>Previous</span>
              </a>
              <div className='btn-group popover-form-dummy-buttons dummy-buttons-table-type-popover'>
                  <label className='btn btn-secondary'>
                    General
                  </label>
                  <label className='btn btn-secondary active'>
                    Goals Potential
                  </label>
                  <label className='btn btn-secondary'>
                    Clean Sheet Potential
                  </label>
              </div>
              <a className='carousel-control-next' href={'#carousel' + props.screen} role='button' data-slide='next'>
                <span className='carousel-control-next-icon' aria-hidden='true'></span>
                <span className='sr-only'>Next</span>
              </a>
            </div>
            <p className='bottom-carousel-p'>
              Attacking and Midfield Fantasy Football assets are all you should be
              thinking about with this tracker type. Target attacking players from teams with
              the easiest upcoming fixtures, as they have the best chance of
              scoring attacking returns against their opposition.
            </p>
          </div>
          <div className='carousel-item'>
            <p className='table-type-question'>Which team can’t hit a barn door? Who has the tamest goal threat in the league?</p>
            <h3>Clean sheet potential</h3>
            <p>
              This tracker rates fixtures based purely on the opposition’s attacking capabilities.
              When sorted by easiest teams who are facing opponents with poor attacks will be
              sorted towards the top. If a particular fixture ie Arsenal (A) is rated easy
              on this type of tracker, this is indicative of Arsenal struggling to score
              frequently when playing at home.
            </p>
            <div className='row'>
              <a className='carousel-control-prev' href={'#carousel' + props.screen} role='button' data-slide='prev'>
                <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                <span className='sr-only'>Previous</span>
              </a>
              <div className='btn-group popover-form-dummy-buttons dummy-buttons-table-type-popover'>
                  <label className='btn btn-secondary'>
                    General
                  </label>
                  <label className='btn btn-secondary'>
                    Goals Potential
                  </label>
                  <label className='btn btn-secondary active'>
                    Clean Sheet Potential
                  </label>
              </div>
              <a className='carousel-control-next' href={'#carousel' + props.screen} role='button' data-slide='next'>
                <span className='carousel-control-next-icon' aria-hidden='true'></span>
                <span className='sr-only'>Next</span>
              </a>
            </div>
            <p className='bottom-carousel-p'>
              Goalkeepers and defenders are all you should be thinking about with this tracker type.
              Target defensive Fantasy Football assets from teams with the easiest upcoming
              fixtures, as they have the best chance of bringing home clean sheet points
              against their opposition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

}

export default TableTypeContent;
