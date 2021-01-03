import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const RadioButtonGroup = (props) => {

  const [radioState, setRadioState] = useState({
    easy : true,
    hard : false,
    alpha : false
  })

  return (
    <form className='radio-button-group radio-button-group-wrapper'>
      <div className='form-check form-check-inline'>
        <input className='form-check-input'
               type='radio'
               name='inlineRadioOptions'
               id='inlineRadio2'
               value='option2'
               checked={radioState.easy}
               onClick={() => {
                 setRadioState({
                   easy : true,
                   hard : false,
                   alpha : false
                 })
                 props.set_grid_sorted_by('easiest');
               }}
          />
        <label className='form-check-label' htmlFor='inlineRadio2'>
          {props.grid_type.general && 'Easiest'}
          {props.grid_type.goals && 'Worst defences (easiest)'}
          {props.grid_type.clean_sheets && 'Worst attacks (easiest)'}
       </label>
      </div>
      <div className='form-check form-check-inline'>
        <input className='form-check-input'
               type='radio'
               name='inlineRadioOptions'
               id='inlineRadio3'
               value='option3'
               checked={radioState.hard}
               onClick={() => {
                 setRadioState({
                   alpha : false,
                   easy : false,
                   hard : true
                 })
                 props.set_grid_sorted_by('hardest');
               }}
        />
        <label className='form-check-label' htmlFor='inlineRadio3'>
          {props.grid_type.general && 'Hardest'}
          {props.grid_type.goals && 'Best defences (hardest)'}
          {props.grid_type.clean_sheets && 'Best attacks (hardest)'}
        </label>
      </div>
      <div className='form-check form-check-inline'>
        <input className='form-check-input'
               type='radio'
               name='inlineRadioOptions'
               id='inlineRadio1'
               checked={radioState.alpha}
               onClick={() => {
                 setRadioState({
                   alpha : true,
                   easy : false,
                   hard : false
                 })
                 props.set_grid_sorted_by('alphabetical');
               }}
        />
        <label className='form-check-label' htmlFor='inlineRadio1'>Alphabetical</label>
      </div>
    </form>
  );
}

export default RadioButtonGroup;
