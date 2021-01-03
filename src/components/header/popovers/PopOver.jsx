import React from 'react';
import ReactDOM from 'react-dom';

const PopOver = (props) => {

  return (
    props.popOverType &&
      <div className={'custom-popover ' + props.popOverClass}>
        <div className={'popover-wrapper ' + props.popOverClass}>
          {props.content}
        </div>
          <button
            type='button'
            className='close'
            aria-label='Close'
            onClick={() => {
              props.set_pop_overs(false)
              props.removeFilters();
             }}
            >
            <span aria-hidden='true'>&times;</span>
          </button>
      </div>
  )
}


export default PopOver;
