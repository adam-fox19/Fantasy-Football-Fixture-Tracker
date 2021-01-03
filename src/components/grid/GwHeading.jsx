import React from 'react';
import ReactDOM from 'react-dom';

const GwHeading = (props) => {
  return (
    <th className='gameweek-heading'>
      {props.gw}
    </th>
  );
}

export default GwHeading;
