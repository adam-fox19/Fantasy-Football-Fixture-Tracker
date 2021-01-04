import React from 'react';
import ReactDOM from 'react-dom';

const GameweekButtonGroup = (props) => {

  // component's radio buttons dictate state of number of gameweeks displayed on grid
  return (
        <div className='btn-group btn-group-toggle gw-btn-group' data-toggle='buttons'>
          {props.remaining_gws >= 4 &&
            <label className='btn btn-secondary active' onClick={() => {
              props.set_gws_to_display({
                gws_to_display : 4
              });
            }}>
              <input type='radio' name='no-of-gws' autoComplete='off' id={props.firstButton}/>{props.firstButton}
            </label>
          }
          {props.remaining_gws >= 6 &&
            <label className='btn btn-secondary' onClick={() => {
              props.set_gws_to_display({
                gws_to_display : 6
              });
            }}>
              <input type='radio' name='no-of-gws' autoComplete='off' id={props.secondButton}/>{props.secondButton}
            </label>
          }
          {props.remaining_gws >= 8 &&
            <label className='btn btn-secondary' onClick={() => {
              props.set_gws_to_display({
                gws_to_display : 8
              });
            }}>
              <input type='radio' name='no-of-gws' autoComplete='off' id={props.thirdButton}/>{props.thirdButton}
            </label>
          }
            <label className='btn btn-secondary' onClick={() => {
              props.set_gws_to_display({
                gws_to_display : props.remaining_gws
              });
            }}>
              <input type='radio' name='no-of-gws' autoComplete='off' id={props.fourthButton}/>{props.fourthButton}
            </label>
        </div>
  );
}


export default GameweekButtonGroup;
