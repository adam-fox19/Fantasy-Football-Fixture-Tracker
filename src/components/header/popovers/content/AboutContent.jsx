import React from 'react';
import ReactDOM from 'react-dom';

const AboutContent = (props) => {

  return (
    <div className='about-popover-wrapper'>
      <h2>About</h2>
      <hr/>
      <h3>Fantasy Football</h3>
      <div className='row'>
        <div className='content-box col-lg-7'>
          <p>
            This tracker is designed for players of the
            official <a
              href='https://fantasy.premierleague.com/'
              target='_blank'
              rel='noopener noreferrer'
              >
            Premier League’s Fantasy Football game</a> to help inform future transfers, strategies & team selections.
            <br/><br/>
            If you don’t already know know the basics of what Fantasy Football is & how to play, there’s a great description available on Fantasy
            Football Scout’s website <a
              href='https://www.fantasyfootballscout.co.uk/2020/09/09/how-to-play-fantasy-premier-league-a-beginners-guide/'
              target='_blank'
              rel='noopener noreferrer'
              > here.
            </a>
          </p>
        </div>
        <div className='content-box col-lg-5'>
          <img className='fpl-graphic'
               src='./media/fplgraphic.png'
               alt='Graphic of Fantasy Football Game & Premier League logo'>
          </img>
        </div>
      </div>
      <hr/>
      <div className='row'>
        <div className='content-box col-lg-4 lg-show'></div>
        <div className='content-box col-lg-8'>
          <h3>The tracker</h3>
        </div>
      </div>
      <div className='row'>
        <div className='content-box col-lg-4 popover-key'>
        <div>
          <span className='key-title'>Key:</span>
          <div className='key-colours'>
            <div className='key-box very-easy'></div>
            <div className='key-box easy'></div>
            <div className='key-box average'></div>
            <div className='key-box hard'></div>
            <div className='key-box very-hard'></div>
            <span className='key-tag key-tag-easy'>Easiest</span>
            <span className='key-tag key-tag-hard'>Hardest</span>
          </div>
          <div className='key-colours key-colours-blank-double key-popover'>
            <div className='key-box blank blank-popover'></div>
            <span className='key-tag key-tag-blank-popover'>Blank</span>
            <div className='key-box double double-popover'></div>
            <span className='key-tag key-tag-hard' id='double-popover-tag'>Double</span>
          </div>
        </div>
        </div>
        <div className='content-box col-lg-8 key-description'>
          <p>
            Each team’s upcoming gameweek fixtures are displayed with a coloured difficulty rating.
            <br/><br />
            Fixture difficulties are calculated using up-to-date season statistics for the corresponding team.
            As the season progresses & each team’s fortunes change, this is reflected on the tracker.
            For instance, a continued poor run of away results for Tottenham could cause the Spurs (A)
            fixture difficulty to gradually change from hard to easy.
          </p>
        </div>
      </div>
      <p className='p-margin-top'>
        The easier the collective difficulty rating of a team’s upcoming fixtures,
        the easier it should be for that team’s players to score Fantasy Football points over that period.
        For a more detailed description on how the tracker is calculated, please see the <a
          href='#'
          onClick={() => {
            props.set_own_popover(false);
            props.set_data_popover(true);
          }
        }
      >Data section</a>.
      </p>
      <hr/>
      <h3>Using the tracker</h3>
      <p>
        To help plan ahead for Fantasy Football decisions, on this tracker you can:
      </p>
        <div>
        <ul className='popover-list'>
            <li>
              <strong>Sort teams by easiest or hardest fixtures, and alphabetically</strong>
              <br/>By default, teams are
              sorted by easiest upcoming fixtures - these are the teams with the best chance of scoring
              Fantasy Football points over the coming gameweeks. Want to know which teams to avoid? Click the ‘Hardest’ button.
              <div className='popover-form-dummy-buttons'>
                <form className='radio-button-group about-popover'>
                  <div className='form-check form-check-inline'>
                    <input className='form-check-input'
                           type='radio'
                           id='dummyRadio1'
                    />
                    <label className='form-check-label' for='dummyRadio1'>Easiest</label>
                  </div>
                  <div className='form-check form-check-inline'>
                    <input className='form-check-input'
                           type='radio'
                           id='dummyRadio2'
                      />
                    <label className='form-check-label' for='dummyRadi02'>Hardest</label>
                  </div>
                  <div className='form-check form-check-inline'>
                    <input className='form-check-input'
                           type='radio'
                           name='inlineRadioOptions'
                           id='dummyRadio3'
                    />
                    <label className='form-check-label' for='dummyRadio3'>Alphabetical</label>
                  </div>
                </form>
              </div>
            </li>
            <li>
              <strong>Change the number of upcoming gameweeks
              <br />
              </strong> Want to know which teams have the easiest
              fixtures over the next 8 gameweeks instead of 4? Just click the corresponding gameweek button.
              <div className='btn-group btn-group-toggle popover-form-dummy-buttons' data-toggle='buttons'>
                  <label className='btn active'>
                    4 weeks
                  </label>
                  <label className='btn'>
                    6 weeks
                  </label>
                  <label className='btn'>
                    8 weeks
                  </label>
                  <label className='btn'>
                    All
                  </label>
              </div>
            </li>
            <li>
              <strong>Change the tracker type</strong>
              <br/>
              The ‘General’ tracker displays fixtures based on overall
              difficulty, taking into account offensive & defensive qualities of the opposition.
              However, you can change the tracker type to purely focus on opposition defences or attacks.
              Want to know which team has fixtures facing opponents with leaky defences? Click ‘Goals potential’.
              After clean sheet Fantasy Football points? Click ‘Clean sheet potential’.
              For more info see the <a
                  href='#'
                  onClick={() => {
                    props.set_own_popover(false);
                    props.set_table_type_popover(true);
                    }
                  }
                >
                Tracker Types section</a>!
              <div className='btn-group btn-group-toggle popover-form-dummy-buttons' data-toggle='buttons'>
                  <label className='btn active'>
                    General
                  </label>
                  <label className='btn'>
                    Goals potential
                  </label>
                  <label className='btn'>
                    Clean sheet potential
                  </label>
              </div>
            </li>
            <li>
              <strong>Hide teams
              <br />
              </strong> Not a fan of a particular team? Then toggle the team’s name in the
              dropright menu to remove them from the tracker. Just toggle the team again to make them re-appear.
              <div className='dropright teams-dropdown popover-form-dummy-buttons'>
                <button
                  className='btn btn-light dropdown-toggle'
                  type='button'
                  aria-haspopup='true'
                  aria-expanded='false'>
                  Teams displaying
                </button>
              </div>
            </li>
          </ul>
        </div>
      <hr/>
      <h3>About me</h3>
      <p>
        I’m a keen fantasy football player with an interest in web development, computer programming &
        all things sport. If you’re at all interested in how well (badly) I’m doing in Fantasy Football
        this season, please feel free to <a
           href='https://fantasy.premierleague.com/entry/1346353/history'
           target='_blank'
           rel='noopener noreferrer'>
           check out my team.</a>
        <br/><br/>
        Thanks for checking out the tracker!
      </p>
    </div>
  )
}

export default AboutContent;
