import React from 'react';
import ReactDOM from 'react-dom';

const GridTypeButtonGroup = (props) => {

  // component's radio buttons dictate state of type of grid displayed on grid
  return (
        <div className='btn-group-wrapper btn-group btn-group-toggle grid-type-btn-group' data-toggle='buttons'>
          <label className='btn active' onClick={() => {
            props.callback({
              general : true,
              goals : false,
              clean_sheets : false
            });
          }}>
            <input type='radio' name='no-of-gws' autoComplete='off' id={props.firstButton}/>{props.firstButton}
          </label>
          <label className='btn' onClick={() => {
            props.callback({
              general : false,
              goals : true,
              clean_sheets : false
            });
          }}>
            <input type='radio' name='no-of-gws' autoComplete='off' id={props.secondButton}/>{props.secondButton}
          </label>
          <label className='btn' onClick={() => {
            props.callback({
              general : false,
              goals : false,
              clean_sheets : true
            });
          }}>
            <input type='radio' name='no-of-gws' autoComplete='off' id={props.thirdButton}/>{props.thirdButton}
          </label>
        </div>
  );
}


export default GridTypeButtonGroup;
